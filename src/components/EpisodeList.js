import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import AsyncStorage from '@react-native-async-storage/async-storage';


const EpisodeItem = ({ episode, onPlayEpisode, isTabletValue }) => (
    <View style={styles.episodeContainer}>
        <View style={styles.rowContainer}>
            <TouchableOpacity onPress={() => onPlayEpisode(episode._id, episode.downloadLink, episode.name)}>
                <Image source={{ uri: episode.poster }} style={[styles.poster, { width: isTabletValue ? responsiveWidth(15) : responsiveWidth(30), height: isTabletValue ? responsiveHeight(15) : responsiveHeight(8) }]} />
                <View style={styles.playButtonContainer}>
                    <Icon style={styles.playButton} name="play-circle" size={30} color="white" />
                </View>
            </TouchableOpacity>
            <View style={styles.episodeDetails}>
                <Text style={[styles.episodeNumber, { fontSize: isTabletValue ? responsiveFontSize(1.4) : responsiveFontSize(2), }]}>{`${episode.episode_number}. ${episode.name}`}</Text>
                <Text style={[styles.episodeName, { fontSize: isTabletValue ? responsiveFontSize(1.2) : responsiveFontSize(1.8), }]}>{episode.runtime} min</Text>
            </View>
        </View>
        <Text style={[styles.episodeOverview, { fontSize: isTabletValue ? responsiveFontSize(1.2) : responsiveFontSize(1.5), }]}>{episode.overview}</Text>
    </View>
);


export default function EpisodeList({ episodesList, isTablet }) {
    console.log("All the episodes are", episodesList)
    const navigation = useNavigation();

    const playEpisode = async (episodeID, episodeLink, episodeName) => {
        // console.log("Episode play", episodeID, episodeLink, episodeName);
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
        // navigation.navigate('ShowsVideoPlayer', { episodeID, episodeLink, episodeName });
    };

    const renderEpisodeItem = ({ item }) => <EpisodeItem episode={item} onPlayEpisode={playEpisode} isTabletValue={isTablet} />;

    return (
        <View style={styles.container}>
            <FlatList
                data={episodesList}
                keyExtractor={(item) => item._id}
                renderItem={renderEpisodeItem}
                scrollEnabled={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    },
    episodeContainer: {
        marginBottom: 15,
        paddingTop: 15,
        paddingHorizontal: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    poster: {
        // width: responsiveWidth(30),
        // height: responsiveHeight(8),
        marginRight: 15,
        borderRadius: 5,
        resizeMode: 'cover',
        opacity: 0.9
    },
    episodeDetails: {
        flex: 1,
    },
    episodeNumber: {
        color: 'white',
        // fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
    },
    episodeName: {
        color: 'white',
        // fontSize: responsiveFontSize(1.8),
        fontWeight: 'bold',
        marginVertical: 5,
    },
    episodeOverview: {
        color: 'white',
        // fontSize: responsiveFontSize(1.5),
    },
    playButtonContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        zIndex: 1, // Ensure play icon is above the image
    },
})