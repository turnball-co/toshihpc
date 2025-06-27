import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  }
})

const SettingsScreen = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Settings</ThemedText>
      <ThemedText>Modify your account settings here.</ThemedText>
    </ThemedView>
  )
}

export default SettingsScreen
