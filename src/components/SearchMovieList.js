import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchMovieList = ({ data, isTablet }) => {

  console.log("Total Movies are",data.length)
  const navigation = useNavigation();
  console.log("Search movie", data);


  const formatReleaseDate = (dateString) => {
    const year = new Date(dateString).getFullYear();
    return year.toString();
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes} min`;
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetails', { movie });
  }

  const renderItem = ({ item }) => (

    <View>
      <TouchableOpacity onPress={() => handleMoviePress(item)}>
        <View style={styles.movieContainer}>
          <Image source={{ uri: item.posterPath }} style={[styles.posterImage, {width: isTablet ? 150 : 80, height: isTablet ? 200 : 120}]} />
          <View style={styles.movieInfo}>
            <Text style={[styles.movieTitle, {fontSize: isTablet ? 20 : 16}]}>{item.title} ({formatReleaseDate(item.releaseDate)})</Text>
            <View style={styles.genreContainer}>
              {item.genres.map((genre, index) => (
                <View key={index} style={styles.genreItem}>
                  <Text style={[styles.movieGenres, {fontSize: isTablet ? 20 : 14}]}>{genre}</Text>
                </View>
              ))}
            </View>
            <Text style={[styles.movieTitle, {fontSize: isTablet ? 20 : 14}]}>{formatRuntime(item.runtime)}</Text>
            {/* Additional movie information if needed */}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      style={styles.flatList}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    backgroundColor: 'black',
  },
  movieContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  posterImage: {
    // width: 80,
    // height: 120,
    marginRight: 10,
  },
  movieInfo: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor:'red',
    justifyContent: 'space-evenly'
  },
  movieTitle: {
    color: 'white',
    // fontSize: 16,
    fontWeight:'bold'
  },
  movieGenres: {
    color: 'white', // Adjust the text color
    // Other styles for movieGenres
  },
  genreContainer: {
    flexDirection: 'row',
  },
  genreItem: {
    backgroundColor: '#202124',
    borderRadius: 10, // Adjust the border radius as needed
    marginRight: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  movieGenres: {
    fontWeight:'bold',
    color:'white'
  }

});

export default SearchMovieList;
