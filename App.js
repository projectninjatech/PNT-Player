import { View, StyleSheet } from 'react-native'
import React from 'react'
import AppNavigation from './src/navigation/AppNavigation'

export default function App() {
  return (
    <View style={styles.container}>
      <AppNavigation/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});