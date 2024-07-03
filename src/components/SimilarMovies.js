import { TouchableOpacity, Image, FlatList, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const SimilarMovies = ({ similarMoviesList, isTablet }) => {

    const navigation = useNavigation();

    const handleSimilarMovies = (selectedSimilarMovie) => {
        navigation.navigate("MovieDetails", { movie: selectedSimilarMovie })
    }

    return (
        <ScrollView style={styles.similarMoviesContainer}>
            <FlatList
                data={similarMoviesList.slice(0, 8)}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleSimilarMovies(item)}>
                        <Image source={{ uri: item.posterPath }} style={[styles.moviePoster, {width: isTablet ? 280 : 180, height: isTablet ? 320 : 250}]} />
                    </TouchableOpacity>
                )}
                numColumns={2}
                windowSize={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                scrollEnabled={false}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    similarMoviesContainer: {
        width: 'auto',
        height: 'auto',
        alignSelf: 'center',
        flexDirection: 'column',
        marginVertical: 10,
        marginBottom: 50,
        flex: 1,
    },
    moviePoster: {
        // width: 180,
        // height: 250,
        marginRight: 15,
        marginBottom: 15,
        borderRadius: 10,
        resizeMode: 'cover'

    },
})


export default SimilarMovies;