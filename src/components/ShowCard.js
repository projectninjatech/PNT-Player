// ShowCardList.js
import React from 'react';
import { responsiveFontSize as rf } from "react-native-responsive-dimensions";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ShowCard = ({ genre, showsList, handleShowDetails, isTablet }) => {
  // console.log("Showlist are", showsList)

  // Fisher-Yates Shuffle Algorithm
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const filteredShows = shuffleArray(showsList.filter((show) => show.genres.includes(genre)));

  const renderShowCards = ({ item }) => (
    <TouchableOpacity onPress={() => handleShowDetails(item)} style={[styles.showCardContainer, { marginRight: isTablet ? 20 : 10 }]}>
      <Image source={{ uri: item.posterPath }} style={[styles.showCardImage, { width: isTablet ? 250 : 150 }]} />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { height: isTablet ? 500 : 280 }]}>
      <Text style={styles.label}>{genre}</Text>
      <FlatList
        data={filteredShows}
        keyExtractor={(item) => item._id}
        renderItem={renderShowCards}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

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
  showCardContainer: {
    borderRadius: 20,
    paddingHorizontal: 10
  },
  showCardImage: {
    height: '100%',
    borderRadius: 10,
  },
});

export default ShowCard;
