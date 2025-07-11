import * as React from 'react'
import { StyleSheet } from 'react-native'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import { StackedLogoAnimation } from './StackedLogoAnimation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    alignItems: 'center'
  },
  icon: {
    marginBottom: 20
  },
  spinner: {
    marginBottom: 16
  },
  text: {
    fontSize: 16
  }
})

export function LoadingScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <StackedLogoAnimation />
      </ThemedView>
    </ThemedView>
  )
}
