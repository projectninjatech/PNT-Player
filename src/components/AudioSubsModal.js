// AudioSubsModal.js
import React from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const AudioSubsModal = ({ visible, audioTracks, selectedAudioTrack, onSelectAudio, subtitles, selectedSubtitle, onSelectSubtitle, onClose, onApply, onCancel }) => {
  return (
    <Modal visible={visible} transparent={true} statusBarTranslucent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.column}>
            <Text style={styles.modalTitle}>Audio Tracks</Text>
            <ScrollView style={styles.tracksContainer}>
              {audioTracks.map((track, index) => (
                <TouchableOpacity key={index} onPress={() => onSelectAudio(index)}>
                  <View style={[styles.trackItem, { backgroundColor: selectedAudioTrack === index ? '#555' : 'transparent' }]}>
                    <Text style={styles.trackText}>{`Audio ${index + 1} - ${track.language}`}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.column}>
            <Text style={styles.modalTitle}>Subtitles</Text>
            <ScrollView style={styles.tracksContainer}>
              {subtitles.map((subtitle, index) => (
                <TouchableOpacity key={index} onPress={() => onSelectSubtitle(index)}>
                  <View style={[styles.trackItem, { backgroundColor: selectedSubtitle === index ? '#555' : 'transparent' }]}>
                    <Text style={styles.trackText}>{`Sub ${index + 1} - ${subtitle.language}`}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.applyButton} onPress={onApply}>
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>

          </View>
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
    flexDirection: 'row',
    backgroundColor: '#303134',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 20,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tracksContainer: {
    maxHeight: '80%',
    marginBottom: 20,
  },
  trackItem: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  trackText: {
    color: 'white',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    backgroundColor: '#EB1825',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AudioSubsModal;
