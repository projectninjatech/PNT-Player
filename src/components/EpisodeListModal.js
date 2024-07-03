// EpisodeListModal.js
import React from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const EpisodeListModal = ({ visible, episodes, onClose }) => {
  const navigation = useNavigation();

  const handleEpisodePlay = (episodeID, episodeLink, episodeName) => {
    onClose();
    navigation.navigate('ShowsVideoPlayer', { episodeID, episodeLink, episodeName });
  }


  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Episodes</Text>
          <FlatList
            data={episodes}
            keyExtractor={(item) => item._id}
            horizontal
            renderItem={({ item }) => (
              <View style={styles.episodeItem}>
                <TouchableOpacity onPress={() => handleEpisodePlay(item._id, item.downloadLink, item.name)}>
                  <Image source={{ uri: item.poster }} style={styles.posterImage} />
                </TouchableOpacity>
                <View style={styles.episodeDetails}>
                  <Text style={styles.episodeName}>{item.name}</Text>
                  <Text style={styles.episodeOverview}>{item.overview}</Text>
                </View>
              </View>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#303134',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  episodeItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 10,
    width: 250,
    marginRight: 10,
  },
  posterImage: {
    width: 250,
    height: 150,
    marginRight: 10,
    borderRadius: 5,
  },
  episodeDetails: {
    flex: 1,
  },
  episodeName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5
  },
  episodeOverview: {
    color: 'white',
    fontSize: 14,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#EB1825',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EpisodeListModal;
