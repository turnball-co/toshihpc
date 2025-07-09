import { LoadingScreen } from '@/components/LoadingScreen'
import { Redirect } from 'expo-router'
import * as React from 'react'
import { Platform } from 'react-native'
import { useAuth } from './context/AuthContext'

// Only import CSS on web platform
if (Platform.OS === 'web') {
  require('./index.css')
}

export default function Index() {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  // Redirect to the tabs
  return <Redirect href="/(tabs)" />
}
