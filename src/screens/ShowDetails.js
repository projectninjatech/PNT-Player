import { View, Text, StatusBar, ScrollView, TouchableOpacity, StyleSheet, Modal, FlatList, Alert } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome5';
import MI from 'react-native-vector-icons/dist/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import MiniVideoplayer from '../components/MiniVideoplayer';
import EpisodeList from '../components/EpisodeList';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getLatestWatchedEpisodeID } from '../api/userShowsWatchtimeAPI';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

export default function ShowDetails({ route }) {
    const navigation = useNavigation();
    const { show } = route.params;

    console.log("Show details all the info",show)
    const [selectedSeasonIndex, setSelectedSeasonIndex] = React.useState(0);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [playOrResume, setPlayorResume] = React.useState("Play");
    const [resumeEpisodeLink, setResumeEpisodeLink] = React.useState(show.seasons[0].episodes[0].downloadLink);
    const [resumeEpisodeID, setResumeEpisodeID] = React.useState(show.seasons[0].episodes[0].episode);
    const [isTablet, setIsTablet] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            const latestEpisodeWatchtime = async () => {
                if (DeviceInfo.getDeviceType() === "Tablet") {
                    setIsTablet(true)
                  }
                const latestWatchedEpisodeID = await getLatestWatchedEpisodeID(show._id);
                setResumeEpisodeID(latestWatchedEpisodeID.episodeID);
                for (const season of show.seasons) {
                    const foundEpisode = season.episodes.find(episode => episode._id.toString() === latestWatchedEpisodeID.episodeID);

                    if (foundEpisode) {
                        setPlayorResume("Resume");
                        setResumeEpisodeLink(foundEpisode.downloadLink);
                        break;
                    }
                }

            };

            latestEpisodeWatchtime();
        }, []) // Empty dependency array means this effect runs once when the component mounts
    );

    console.log("Show Details", show)

    const goBack = () => {
        navigation.goBack();
    }

    const openSeasonSelector = () => {
        setModalVisible(true)
    }

    const handleSeasonChange = (index) => {
        setSelectedSeasonIndex(index)
        setModalVisible(false);
    }

    const playShow = async (show) => {
        try {
            const latestWatchedEpisodeID = await getLatestWatchedEpisodeID(show._id)
            let episodeID = latestWatchedEpisodeID.episodeID
            let episodeName = "";
            let episodeLink = "";

            if (episodeID != null) {
                for (const season of show.seasons) {
                    const foundEpisode = season.episodes.find(episode => episode._id.toString() === latestWatchedEpisodeID.episodeID);
    
                    if (foundEpisode) {
                        episodeName = foundEpisode.name;
                        episodeLink = foundEpisode.downloadLink
                        break;
                    }
                }
            } else {
                episodeID = show.seasons[0].episodes[0]._id
                episodeLink = show.seasons[0].episodes[0].downloadLink
                episodeName = show.seasons[0].episodes[0].name
            }

            try {
                if(!episodeLink || episodeLink === '') {
                    Alert.alert("Episode not available", "This episode is not currently available!")
                    return
                }
                const httpAddress = await AsyncStorage.getItem('httpAddress');
                if (httpAddress) {
                    let updatedLink = episodeLink.replace(/^https?:\/\/[^\/]+/, httpAddress);
                    // Check and remove the ._ prefix if it exists
                    const prefixToRemove = "._";
                    const prefixIndex = updatedLink.indexOf(prefixToRemove);
                    if (prefixIndex !== -1) {
                        updatedLink = updatedLink.slice(0, prefixIndex) + updatedLink.slice(prefixIndex + prefixToRemove.length);
                    }
                    console.log("Updated Episode link", updatedLink);
                    navigation.navigate("ShowsVideoPlayer", { episodeID, episodeLink: updatedLink, episodeName })
                } else {
                    const prefixToRemove = "._";
                    const prefixIndex = episodeLink.indexOf(prefixToRemove);
                    if (prefixIndex !== -1) {
                        episodeLink = episodeLink.slice(0, prefixIndex) + episodeLink.slice(prefixIndex + prefixToRemove.length);
                    }
                    console.log("Episode link", episodeLink);
                    navigation.navigate("ShowsVideoPlayer", { episodeID, episodeLink, episodeName })
                }
            } catch (error) {
                console.error("Error fetching httpAddress from AsyncStorage:", error);
            }

            // navigation.navigate("ShowsVideoPlayer", { episodeID, episodeLink, episodeName })

        } catch (error) {
            console.error("Error playing the show:", error);
        }
    }


    return (
        <View style={[styles.container, {alignItems: isTablet ? 'center' : 'none'}]}>
        <ScrollView style={{width: isTablet ? '50%' : '100%'}}>

            {show.length !== 0 && (
                <Modal
                    transparent={false}
                    visible={isModalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Select a Season</Text>
                        <View style={styles.seasonContainer}>
                            <FlatList
                                data={show.seasons.map((season, index) => ({ season, index }))}
                                keyExtractor={(item) => `${item.index}`}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => handleSeasonChange(item.index)}
                                    >
                                        <Text style={styles.modalItemText}>{`Season ${item.index + 1}`}</Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalCloseButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}


            <StatusBar translucent backgroundColor="transparent" />
            <TouchableOpacity onPress={() => goBack()}>
                <Icon style={styles.backButton} name="arrowleft" size={30} color="white" />
            </TouchableOpacity>

            {show.length != 0 && (<MiniVideoplayer videoUri={resumeEpisodeLink} episodeID={resumeEpisodeID} />)}
            <View style={styles.showDetailsContainer}>
                <Text style={styles.showTitle}>{show.name}</Text>
                <View style={styles.subDetailsContainer}>
                    <Text style={styles.subDetails}>{new Date(show.releaseDate).getFullYear()}   |</Text><MI style={{ marginTop: 10 }} name="hd" size={20} color="white" /><Text style={styles.subDetails}>   |    ⭐ {show.ratings}</Text>
                </View>
                <View style={styles.subDetailsContainer}>
                    <MI style={{ marginTop: 10, }} name="speaker" size={20} color="white" /><Text style={styles.subDetails}>  English  |  Hindi</Text><MI style={{ marginTop: 10, }} name="subtitles" size={20} color="white" /><Text style={styles.subDetails}>  EN</Text>
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.playButton} onPress={() => playShow(show)}>
                    <FAIcon name="play" size={20} color="black" />
                    <Text style={styles.playButtonText}>{playOrResume}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton} onPress={() => console.log('Download button pressed')}>
                    <FAIcon name="download" size={20} color="white" />
                    <Text style={styles.downlaodButtonText}>Download</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.detailsContainer}>
                <Text style={[styles.overview, {fontSize: isTablet ? responsiveFontSize(1.2) : 12}]}>{show.overview}</Text>
                {show.length != 0 && (<Text style={[styles.genresText, {fontSize: isTablet ? responsiveFontSize(1.2) : 15}]}>Genre: {show.genres.join('  |  ')}</Text>)}
            </View>

            {show.length !== 0 && (
                <TouchableOpacity style={styles.seasonButtonContainer} onPress={() => openSeasonSelector()}>
                    <Text style={styles.seasonButton}>{`Season ${selectedSeasonIndex + 1}`}</Text>
                </TouchableOpacity>
            )}

            {show.length != 0 && (<EpisodeList episodesList={show.seasons[selectedSeasonIndex].episodes} isTablet={isTablet}/>)}
        </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
    },

    backButton: {
        marginVertical: 40,
        marginHorizontal: 20
    },

    showDetailsContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15
    },

    showTitle: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
    },

    subDetailsContainer: {
        flexDirection: 'row',
    },
    subDetails: {
        marginTop: 10,
        color: 'white',
        fontSize: 15,
        marginRight: 15,
    },

    buttonContainer: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'column',
    },

    playButton: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    playButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
    },

    downloadButton: {
        backgroundColor: '#2D2D2D',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    downlaodButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8
    },

    detailsContainer: {
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'column',
        marginVertical: 5
    },

    overview: {
        color: 'white',
        // fontSize: 12,
        marginVertical: 5

    },

    genresText: {
        color: 'white',
        fontWeight: 'bold',
        // fontSize: 15,
    },

    seasonButtonContainer: {
        backgroundColor: 'gray',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },

    seasonButton: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },

    seasonContainer:{
        width:'90%'
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },

    modalItem: {
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
        marginVertical: 5,
    },

    modalItemText: {
        color: 'white',
        fontSize: 16,
    },

    modalCloseButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: '90%',
    },

    modalCloseButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        justifyContent: 'center',
        textAlign: 'center'
    },
})