import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";
import FastImage from 'react-native-fast-image';
import React from 'react'

const MovieCards = ({ genre, moviesList, handleMovieDetails, isTablet }) => {

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filteredMovies = shuffleArray(moviesList.filter((movie) => movie.genres.includes(genre)));

  const renderMovieCards = ({ item }) => (
    <TouchableOpacity onPress={() => handleMovieDetails(item)} style={[styles.movieCardContainer, {marginRight: isTablet ? 20 : 10}]}>
      {/* <Image source={{ uri: item.posterPath }} style={[styles.moviecardImage, {width: isTablet ? 250 : 150}]} /> */}
      <FastImage
        style={[styles.moviecardImage, { width: isTablet ? 250 : 150 }]}
        source={{ uri: item.posterPath, priority: FastImage.priority.normal }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </TouchableOpacity>
  )

  return (
    <View style={[styles.container, { height: isTablet ? 500 : 280 }]}>
      <Text style={styles.label}>{genre}</Text>
      <FlatList
        data={filteredMovies.slice(0,5)}
        keyExtractor={(item) => item._id}
        renderItem={renderMovieCards}
        horizontal
        windowSize={2}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  label: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: 'white',
  },
  movieCardContainer: {
    borderRadius: 20,
    paddingHorizontal:10
  },
  moviecardImage: {
    height: '100%',
    borderRadius: 10,
  },
});

export default MovieCards;