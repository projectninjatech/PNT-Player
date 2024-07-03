import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { responsiveHeight as rh, responsiveWidth as rw, responsiveFontSize as rf } from "react-native-responsive-dimensions";
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { mylistAPI } from '../api/mylistAPI';

const MylistMovies = ({ mylist, label, isTablet }) => {

  const navigation = useNavigation();

  const [moviesList, setMoviesList] = React.useState([]);

  React.useEffect(() => {
    const fetchMovies = async () => {
      const movies = await mylistAPI();
      setMoviesList(movies.moviesInMyList);
    };

    fetchMovies();
  }, [mylist]);

  const handleMovieDetails = (movie) => {
    navigation.navigate('MovieDetails', { movie });
  }

  // console.log("Movie list is fetched", moviesList)
  const renderMovieCards = ({ item }) => (
    <TouchableOpacity onPress={() => handleMovieDetails(item)} style={[styles.movieCardContainer, {marginRight: isTablet ? 20 : 10}]}>
      <Image source={{ uri: item.posterPath }} style={[styles.moviecardImage, {width: isTablet ? 250 : 150}]} />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { height: isTablet ? 500 : 250 }]}>
      <Text style={styles.label}>{label}</Text>
      <FlatList data={moviesList} keyExtractor={(item) => item._id} renderItem={renderMovieCards} horizontal showsHorizontalScrollIndicator={false} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    // height: 250,
  },
  label: {
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: 'white'
  },
  movieCardContainer: {
    // marginRight: 10,
    borderRadius: 20,
  },
  moviecardImage: {
    // width: 150,
    height: '100%',
    borderRadius: 10,
  }
})

export default MylistMovies;