import { useAuth } from '@/app/context/AuthContext'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import * as React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16
  },
  subtitle: {
    marginBottom: 24,
    fontSize: 16,
    color: '#687076'
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    boxShadow: '0 2px 3.5px rgba(0, 0, 0, 0.25)', // Updated to use boxShadow
    elevation: 5
  },
  cardIcon: {
    marginBottom: 8
  },
  cardText: {
    marginTop: 8,
    color: '#687076'
  }
})

export default function HomeScreen() {
  const { user } = useAuth()

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<IconSymbol size={310} color="#808080" name="house.fill" style={styles.headerImage} />}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome{user?.displayName ? `, ${user.displayName}` : ''}!</ThemedText>
        </ThemedView>
        <ThemedText style={styles.subtitle}>Welcome to toshihpc - Something is happening!</ThemedText>
        <ThemedText style={styles.subtitle}>Here are some things you can do:</ThemedText>
        <ThemedView style={styles.card}>
          <IconSymbol name="bell.fill" size={24} color="#0a7ea4" style={styles.cardIcon} />
          <ThemedText type="subtitle">Notifications</ThemedText>
          <ThemedText style={styles.cardText}>You have no new notifications at this time.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <IconSymbol name="calendar" size={24} color="#0a7ea4" style={styles.cardIcon} />
          <ThemedText type="subtitle">Upcoming Events</ThemedText>
          <ThemedText style={styles.cardText}>No upcoming events scheduled.</ThemedText>
        </ThemedView>
        <ThemedView style={styles.card}>
          <IconSymbol name="star.fill" size={24} color="#0a7ea4" style={styles.cardIcon} />
          <ThemedText type="subtitle">Featured Content</ThemedText>
          <ThemedText style={styles.cardText}>Check back later for featured content.</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}
