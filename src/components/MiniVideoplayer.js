import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React,{useState} from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome5';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import { getShowWatchtime } from '../api/userShowsWatchtimeAPI';
import { useFocusEffect } from '@react-navigation/native';

export default function MiniVideoplayer({ videoUri, episodeID }) {
    const [isPaused, setIsPaused] = React.useState(true);
    const [isMute, setIsMute] = React.useState(false);
    const [showControls, setShowControls] = useState(true);
    const [progress, setProgress] = React.useState(0)
    const [isBuffering, setIsBuffering] = useState(true);
    const [watchTime, setWatchtime] = React.useState(0);

    const ref = React.useRef();
    // console.log("Mini video",episodeID)

    useFocusEffect(
        React.useCallback(() => {
            const fetchWatchedTime = async () => {
                try {
                    const response = await getShowWatchtime(episodeID);
                    console.log("Episode retrived watchtime")
                    setWatchtime(response.watchedTime);
                } catch (error) {
                    console.error('Error fetching show watched time', error);
                }
            };

            fetchWatchedTime();
        }, [episodeID])
    );

    const handlePlayVideo = () => {
        setIsPaused(false);
    }

    const handlePauseVideo = () => {
        setIsPaused(true);
    }

    const handleVoumeUp = () => {
        setIsMute(false);
    }

    const handleVolumeMute = () => {
        setIsMute(true);
    }

    const handleScreenPress = () => {
        setShowControls(!showControls);
    };

    const formatDuration = (durationInSeconds) => {
        const hours = Math.floor(durationInSeconds / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = Math.floor(durationInSeconds % 60);

        const formattedHours = hours > 0 ? `${hours}:` : '';
        const formattedMinutes = `${minutes < 10 && hours > 0 ? '0' : ''}${minutes}:`;
        const formattedSeconds = `${seconds < 10 ? '0' : ''}${seconds}`;

        return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
    };


    return (
        <TouchableWithoutFeedback onPress={handleScreenPress}>
        <View>
            <Video source={{ uri: videoUri }}
                ref={ref}
                onProgress={prog => {
                    // console.log(prog);
                    setProgress(prog)
                }}
                onBuffer={(bufferValue) => {
                    console.log(bufferValue.isBuffering);
                    setIsBuffering(bufferValue.isBuffering);
                }}
                muted={isMute}
                paused={isPaused}
                resizeMode='cover'
                onLoad={(videoInfo) => {
                    console.log("Mini Videoplayer Loaded...",videoInfo)
                    // console.log(videoInfo)
                    if (watchTime > 0) {
                        ref.current.seek(watchTime);
                    }
                }}
                onError={this.videoError}
                style={[styles.backgroundVideo, { opacity: showControls ? 0.5 : 1 }]} />


            {
                showControls && (
                    <View style={styles.controlsContainer}>
                        {
                            !isBuffering ? (<View style={styles.playButtonContainer}>
                                {isPaused ? (
                                    <TouchableOpacity onPress={handlePlayVideo}>
                                        <Icon name="playcircleo" size={50} color="white" />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity onPress={handlePauseVideo}>
                                        <Icon name="pausecircleo" size={50} color="white" />
                                    </TouchableOpacity>
                                )}
                            </View>) : (<Text style={{ color: 'red' }}>Loading...</Text>)
                        }


                        <View style={styles.volumeContainer}>
                            {isMute ? (
                                <TouchableOpacity onPress={handleVoumeUp}>
                                    <FAIcon name="volume-mute" size={20} color="white" />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={handleVolumeMute}>
                                    <FAIcon name="volume-up" size={20} color="white" />
                                </TouchableOpacity>
                            )}
                        </View>

                        <View style={styles.sliderContainer}>
                            <Slider
                                style={{ width: '90%', color: 'red' }}
                                minimumValue={0}
                                maximumValue={progress.seekableDuration}
                                minimumTrackTintColor="red"
                                maximumTrackTintColor="white"
                                onValueChange={(prog) => {
                                    ref.current.seek(prog);
                                }}
                                value={progress.currentTime}
                                thumbTintColor="red"
                            />
                            <Text style={{ color: 'white' }}>{formatDuration(progress.seekableDuration)}</Text>
                        </View>
                    </View>
                )
            }

        </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    backgroundVideo: {
        width: '100%',
        height: 200,
    },
    controlsContainer: {
        position: 'absolute',
        width: '100%',
        height: 200,
        // backgroundColor:'red',

    },

    playButtonContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -25,
        marginTop: -25,
    },
    volumeContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    sliderContainer: {
        position: 'absolute',
        top: '80%',
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
})