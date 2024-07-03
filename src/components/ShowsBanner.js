import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import { addShowsToMylist, removeShowFromMylist, showsMyList } from '../api/mylistAPI';
import { getLatestWatchedEpisodeID } from '../api/userShowsWatchtimeAPI';
import { useNavigation } from '@react-navigation/native';

const ShowsBanner = ({ showsList, ShowMylist, updateUserShowMylist, isTablet }) => {
    const navigation = useNavigation();
    const [userShowMylist, setUserShowMylist] = useState(ShowMylist);

    useEffect(() => {
        const fetchUserShowList = async () => {
            try {
                const showUserMyList = await showsMyList();
                const showIds = showUserMyList.showsInMyList.map(show => show._id)
                setUserShowMylist(showIds)
            } catch (error) {
                console.error("Error fetching or saving user show list", error);
            }
        };

        fetchUserShowList();
    }, []);

    const moveToMovieScreen = () => {
        navigation.goBack();
    };

    const posterPlayButton = async (show) => {
        try {
            const latestWatchedEpisodeID = await getLatestWatchedEpisodeID(show._id);

            console.log("Show with episode id", show);
            console.log("Latest watched episode ID", latestWatchedEpisodeID.episodeID);
            let episodeID = latestWatchedEpisodeID.episodeID
            let episodeName = "";
            let episodeLink = "";

            // Find the episode in the show's seasons
            if (episodeID != null) {
                for (const season of show.seasons) {
                    const foundEpisode = season.episodes.find(episode => episode._id.toString() === latestWatchedEpisodeID.episodeID);

                    if (foundEpisode) {
                        episodeName = foundEpisode.name;
                        episodeLink = foundEpisode.downloadLink
                        break; // Assuming each episode ID is unique within a show
                    }
                }
            } else {
                episodeID = show.seasons[0].episodes[0]._id
                episodeLink = show.seasons[0].episodes[0].downloadLink
                episodeName = show.seasons[0].episodes[0].name
            }

            navigation.navigate("ShowsVideoPlayer", { episodeID, episodeLink, episodeName })


        } catch (error) {
            console.error("Error in posterPlayButton:", error);
        }
    };

    const handleBanner = (show) => {
        navigation.navigate('ShowDetails', { show });
    }

    const posterInfoButton = (show) => {
        console.log("Poster Info button clicked");
        navigation.navigate('ShowDetails', { show });
    };

    const addToList = async (item) => {
        try {
            let response;
            if (userShowMylist.includes(item._id)) {
                console.log("Removed show from the showmylist", item._id);
                response = await removeShowFromMylist(item._id);
            } else {
                console.log("Added show to the showmylist", item._id);
                response = await addShowsToMylist(item._id);
            }

            const updatedUserShowMylist = response.user.showsMylist;
            setUserShowMylist(updatedUserShowMylist);
            updateUserShowMylist(updatedUserShowMylist);
        } catch (error) {
            console.error("Error adding/removing show from list", error);
        }
    };


    const renderShowsBanner = ({ item }) => (
        <TouchableOpacity onPress={() => handleBanner(item)}>
            <ImageBackground source={{ uri: isTablet ? item.backdropPath : item.posterPath }} style={styles.posterImage} resizeMode="cover">
                {isTablet && (<TouchableOpacity style={styles.tabletShowPoster}>
                    <Image source={{ uri: item.posterPath }} style={{ width: 100, height: 150 }} />
                </TouchableOpacity>)}
                <View style={[styles.logoContainer, {display: isTablet ? 'none' : 'flex'}]}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </View>
                <TouchableOpacity style={styles.transparentButton} onPress={() => moveToMovieScreen()}>
                    <Text style={[styles.buttonText, { fontSize: isTablet ? responsiveFontSize(1.5) : responsiveFontSize(2) }]}>Movies</Text>
                </TouchableOpacity>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1)']} style={styles.linearGradient}>
                    <TouchableOpacity key={item} style={styles.myListButton} onPress={() => addToList(item)}>
                        {userShowMylist.includes(item._id) ? (
                            <Icon name="checkcircle" size={isTablet ? 50 : 30} color="lightgreen" />
                        ) : (
                            <Icon name="plus" size={isTablet ? 50 : 30} color="white" />
                        )}
                        <Text style={styles.myListText}>My List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.posterPlayButton, { justifyContent: isTablet ? 'center' : 'none', width: isTablet ? responsiveWidth(20) : responsiveWidth(25), }]} onPress={() => posterPlayButton(item)}>
                        <EntypoIcon name="controller-play" size={isTablet ? 50 : 30} color="black" />
                        <Text style={styles.playText}>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.posterInfoButton} onPress={() => posterInfoButton(item)}>
                        <Icon name="infocirlceo" size={isTablet ? 50 : 30} color="white" />
                        <Text style={styles.infoButtonTxt}>Info</Text>
                    </TouchableOpacity>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { height: isTablet ? responsiveHeight(90) : responsiveHeight(70) }]}>
            <FlatList
                pagingEnabled
                data={showsList}
                keyExtractor={(item) => item._id}
                renderItem={renderShowsBanner}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // height: responsiveHeight(70),
        width: '100%',
    },
    logoContainer: {
        position: 'absolute',
        top: responsiveHeight(4),
        left: responsiveWidth(3),
    },
    logo: {
        width: 80,
        height: 80
    },
    posterImage: {
        width: responsiveWidth(100),
        height: '100%',
        justifyContent: 'flex-end',
    },
    linearGradient: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    posterPlayButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
        borderRadius: responsiveWidth(2),
        // width: responsiveWidth(25),
    },
    playText: {
        color: 'black',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginLeft: responsiveWidth(1.5)
    },
    myListButton: {
        alignItems: 'center',
    },
    myListText: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginTop: responsiveHeight(0.5)
    },
    posterInfoButton: {
        alignItems: 'center',
    },
    infoButtonTxt: {
        color: 'white',
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        marginTop: responsiveHeight(0.5)
    },
    transparentButton: {
        position: 'absolute',
        top: responsiveHeight(6),
        right: responsiveWidth(3),
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
    },
    tabletShowPoster: {
        position: 'absolute',
        top: responsiveHeight(6),
        left: responsiveWidth(3),
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'white',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        // fontSize: responsiveFontSize(2),
        fontWeight: 'bold',

    },
});

export default ShowsBanner;
