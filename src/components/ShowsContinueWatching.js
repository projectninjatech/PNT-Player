import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native'
import { responsiveHeight as rh, responsiveWidth as rw, responsiveFontSize as rf } from "react-native-responsive-dimensions";
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { useFocusEffect } from '@react-navigation/native';
import { getAllShowsWatchtime, removeShowWatchtime } from '../api/userShowsWatchtimeAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowsContinueWatching = ({ allshowsList, label, isTablet }) => {

    const navigation = useNavigation();

    const [watchedShowsList, setWatchedShowsList] = React.useState([]);
    const [totalShows, setTotalShows] = React.useState([])

    useFocusEffect(
        React.useCallback(() => {
            const fetchShows = async () => {
                const shows = await getAllShowsWatchtime();
                console.log("Shows on tv shows are", shows)
                
                // Create a map to store the latest episode for each showID
                const latestEpisodesMap = new Map();
    
                // Iterate through each watched show
                shows.watchedShows.forEach(watchedShow => {
                    const { showId } = watchedShow.episodeInfo;
                    const { uploadTime } = watchedShow
                    
                    // If the showID is not in the map or the current episode has a later uploadTime
                    if (!latestEpisodesMap.has(showId) || uploadTime > latestEpisodesMap.get(showId).uploadTime) {
                        latestEpisodesMap.set(showId, watchedShow);
                    }
                });
    
                // Convert the map values back to an array
                const latestEpisodesList = Array.from(latestEpisodesMap.values());
    
                setWatchedShowsList(latestEpisodesList);
                setTotalShows(allshowsList);
            };
    
            fetchShows();
        }, [allshowsList])
    );

    const handleShowPlay = async (episodeID, episodeLink, episodeName) => {
        // navigation.navigate('ShowsVideoPlayer', { episodeID, episodeLink, episodeName });
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
    }

    const findShowById = (showId) => {
        return totalShows.find(show => show._id === showId);
    };

    const handleInfoIconPress = (showID) => {
        const showInfo = findShowById(showID);
        console.log("Showinfo",showInfo)
        if (showInfo) {
            // If show details are found, navigate to ShowDetails screen with showInfo
            navigation.navigate('ShowDetails', { show: showInfo });
        } else {
            // Handle the case where the show details are not found
            console.error("Show details not found with ID:", showID);
        }
    }

    const handleCrossIconPress = async (episodeID) => {
        console.log("Delete episode from the user watched show list", episodeID)
        try {
            // Call the API to remove the movie from the watched list
            await removeShowWatchtime(episodeID);

            // After removing, trigger a re-fetch of the watched movies list
            const updatedWatchedShowList = await getAllShowsWatchtime();
            setWatchedShowsList(updatedWatchedShowList.watchedShows)
        } catch (error) {
            console.error("Error removing movie from watched list:", error.message);
        }
    }

    
    const renderEpisodeCards = ({ item }) => (
        <TouchableOpacity onPress={() => handleShowPlay(item.episodeInfo.episodeID, item.episodeInfo.episodeLink, item.episodeInfo.episodeName)} style={[styles.showCardContainer, {marginRight: isTablet ? 20 : 10}]}>
            <Image source={{ uri: item.episodeInfo.showPoster }} style={[styles.showCardImage, {width: isTablet ? 250 : 150}]} />
            <View style={[styles.progressbarContainer, { height: isTablet ? '15%' : '20%' }]}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={item.episodeInfo.episodeRuntime * 60}
                    minimumTrackTintColor="red"
                    maximumTrackTintColor="white"
                    thumbTintColor="red"
                    value={item.watchedTime}
                />
                <TouchableOpacity>
                    <View style={styles.imageFooter}>
                        <TouchableOpacity onPress={() => handleInfoIconPress(item.episodeInfo.showId)}>
                            <Icon name="info-circle" size={isTablet ? 40 : 20} color="white" />
                        </TouchableOpacity>

                        <Text style={{ color: 'white', fontSize: isTablet ? rf(1.2) : 14 }}>S{item.episodeInfo.seasonNumber}:E{item.episodeInfo.episodeNumber}</Text>

                        <TouchableOpacity onPress={() => handleCrossIconPress(item.episodeInfo.episodeID)}>
                            <EntypoIcon name="cross" size={isTablet ? 50 : 25} color="white" />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>
            <Icon style={styles.playButton} name="play-circle" size={isTablet ? 120 : 80} color="white" />
        </TouchableOpacity>
    );



    return (
        <View style={[styles.container, { height: isTablet ? 500 : 250 }]}>
            <Text style={styles.label}>{label}</Text>
            <FlatList data={watchedShowsList} keyExtractor={(item) => item.id} renderItem={renderEpisodeCards} horizontal showsHorizontalScrollIndicator={false} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        // height: 250,
        marginVertical: 20,
        marginHorizontal:10,
    },
    label: {
        paddingHorizontal: 10,
        marginBottom: 10,
        fontSize: rf(2.5),
        fontWeight: 'bold',
        color: 'white'
    },
    showCardContainer: {
        // marginRight: 10,
        borderRadius: 20,
        position: 'relative',
    },
    showCardImage: {
        // width: 150,
        height: '100%',
        borderRadius: 10,
        opacity: 0.85
    },
    progressbarContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        // height: '20%',
        backgroundColor: '#343541',

    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -40 }, { translateY: -40 }],
    },
    slider: {
        width: '100%',
        bottom: 8,
    },
    imageFooter: {
        backgroundColor: '#343541',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        bottom: 8
    }
})

export default ShowsContinueWatching;