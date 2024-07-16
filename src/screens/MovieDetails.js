import { View, Text, StatusBar, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import FAIcon from 'react-native-vector-icons/dist/FontAwesome5';
import MI from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useNavigation } from '@react-navigation/native';
import { similarMoviesAPI } from '../api/similarMoviesAPI';
import SimilarMovies from '../components/SimilarMovies';
import MiniVideoplayer from '../components/MiniVideoplayer';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MovieDetails({ route }) {

    const navigation = useNavigation();
    const { movie } = route.params;

    // console.log("Movie List", movie)

    const [similarMoviesList, setSimilarMoviesList] = useState([]);
    const [isTablet, setIsTablet] = React.useState(false)

    React.useEffect(() => {
        const similarMoviesListAPICall = async () => {
            try {
                console.log("Movie ID", movie._id)
                const similarMovies = await similarMoviesAPI(movie._id);
                setSimilarMoviesList(similarMovies)
                // console.log("Similar Movies", similarMovies);
                if (DeviceInfo.getDeviceType() === "Tablet") {
                    setIsTablet(true)
                }
            } catch (error) {
                console.error("Error fetching similar movies:", error);
            }
        };

        similarMoviesListAPICall();
    }, [movie]);

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;

        return `${hours}h ${remainingMinutes}m`;
    }

    const goBack = () => {
        navigation.goBack();
    }

    const playMovie = async (movieID, movieLink, movieTitle) => {
        // navigation.navigate('VideoPlayer', { movieID, movieLink, movieTitle });
        try {
            const httpAddress = await AsyncStorage.getItem('httpAddress');
            if (httpAddress) {
                const updatedLink = movieLink.replace(/^https?:\/\/[^\/]+/, httpAddress);
                console.log("Updated Movie link", updatedLink);
                navigation.navigate('VideoPlayer', { movieID, movieLink: updatedLink, movieTitle });
            } else {
                console.log("Movie link", movieLink);
                navigation.navigate('VideoPlayer', { movieID, movieLink, movieTitle });
            }
        } catch (error) {
            console.error("Error fetching httpAddress from AsyncStorage:", error);
        }
    }

    return (

        <View style={[styles.container, {alignItems: isTablet ? 'center' : 'none'}]}>
            <TouchableWithoutFeedback>
                <ScrollView style={{width: isTablet ? '50%' : '100%'}}>
                    <StatusBar translucent backgroundColor="transparent" />
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon style={styles.backButton} name="arrowleft" size={30} color="white" />
                    </TouchableOpacity>

                    <MiniVideoplayer videoUri={movie.downloadLink} />

                    <View style={styles.movieDetailsContainer}>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        <View style={styles.subDetailsContainer}>
                            <Text style={styles.subDetails}>{new Date(movie.releaseDate).getFullYear()}   |   {formatRuntime(movie.runtime)}   |</Text><MI style={{ marginTop: 10, }} name="hd" size={20} color="white" />
                        </View>
                        <View style={styles.subDetailsContainer}>
                            <MI style={{ marginTop: 10, }} name="speaker" size={20} color="white" /><Text style={styles.subDetails}>  English  |  Hindi</Text><MI style={{ marginTop: 10, }} name="subtitles" size={20} color="white" /><Text style={styles.subDetails}>  EN</Text>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.playButton} onPress={() => playMovie(movie._id, movie.downloadLink, movie.title)}>
                            <FAIcon name="play" size={20} color="black" />
                            <Text style={styles.playButtonText}>Play</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.downloadButton} onPress={() => console.log('Download button pressed')}>
                            <FAIcon name="download" size={20} color="white" />
                            <Text style={styles.downlaodButtonText}>Download</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.detailsContainer}>
                        <Text style={[styles.overview, {fontSize: isTablet ? responsiveFontSize(1.1) : 12}]}>{movie.overview}</Text>
                        <Text style={[styles.genresText, {fontSize: isTablet ? responsiveFontSize(1.2) : 15}]}>Genre: {movie.genres.join('  |  ')}</Text>
                    </View>

                    <View style={styles.similarMovieTxtContainer}>
                        <Text style={styles.similarMovieTxt}>Similar Movies</Text>
                    </View>

                    <SimilarMovies similarMoviesList={similarMoviesList} isTablet={isTablet} />
                </ScrollView>
            </TouchableWithoutFeedback>
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

    movieDetailsContainer: {
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 15
    },

    movieTitle: {
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

    similarMovieTxtContainer: {
        width: '95%',
        alignSelf: 'center',
        marginVertical: 10,
        backgroundColor: 'red',
        paddingHorizontal: 8
    },
    similarMovieTxt: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
    },

})