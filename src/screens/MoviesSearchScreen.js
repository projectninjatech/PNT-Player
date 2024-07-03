import { View, Text, TextInput, StatusBar, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { movieSearchAPI } from '../api/MovieSearchAPI';
import SearchMovieList from '../components/SearchMovieList';
import { moviesListAPI } from '../api/moviesList';
import DeviceInfo from 'react-native-device-info';

// Movie Search Screen
export default function MoviesSearchScreen() {

    const [searchText, setSearchText] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const [moviesList, setmoviesList] = React.useState([])
    const [isTablet, setIsTablet] = React.useState(false)

    React.useEffect(() => {
        const moviesListAPICall = async () => {
            const movies = await moviesListAPI();
            setmoviesList(movies)
            if (DeviceInfo.getDeviceType() === "Tablet") {
                setIsTablet(true)
            }
        }

        moviesListAPICall();
    }, [])

    // console.log("Search Movie List", moviesList)

    const handleSearch = async (text) => {
        setSearchText(text);
        if (text.length > 2) {
            const results = await movieSearchAPI(text);
            setSearchResults(results);
            // Handle the search results as needed
            console.log('Search Results:', searchResults);
        } else {
            // Clear the search results or handle accordingly
            setSearchResults([]);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <StatusBar translucent backgroundColor="transparent" />
                <View style={styles.searchContainer}>
                    <TextInput
                        placeholder="Search"
                        placeholderTextColor="#888"
                        style={styles.searchInput}
                        onChangeText={handleSearch}
                        value={searchText}
                    />
                    <Icon name="search1" size={20} color="#888" style={styles.searchIcon} />
                </View>
                {searchResults.length > 0 ? (
                    <SearchMovieList data={searchResults} />
                ) : (
                    <View>
                        <Text style={styles.allMoviesLabel}>All Movies ({moviesList.length})</Text>
                        <SearchMovieList data={moviesList} isTablet={isTablet}/>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },

    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 60,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#333',
        alignSelf: 'center',
        width: '90%', // 80% of the parent container
    },

    searchInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        color: 'white',
    },
    searchIcon: {
        marginLeft: 10,
    },

    allMoviesLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10, 
        marginHorizontal: 20,
    }
})