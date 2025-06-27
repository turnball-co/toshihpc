import { LoadingScreen } from '@/components/LoadingScreen'
import { Redirect } from 'expo-router'
import * as React from 'react'
import { useAuth } from './context/AuthContext'
import './index.css'

export default function Index() {
  const { loading } = useAuth()

  if (loading) {
    return <LoadingScreen />
  }

  // Redirect to the tabs
  return <Redirect href="/(tabs)" />
}
