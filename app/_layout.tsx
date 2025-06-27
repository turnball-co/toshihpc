import { AuthProvider, useAuth } from '@/app/context/AuthContext'
import { LoadingScreen } from '@/components/LoadingScreen'
import { useColorScheme } from '@/hooks/useColorScheme'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { useEffect } from 'react'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import './app.css'
import { ModalProvider } from './context/ModalContext'
import { Platform } from 'react-native'

if (Platform.OS === 'web') {
  global._frameTimestamp = null
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const stripePromise = loadStripe(process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

function RootLayoutNav() {
  const { user, loading } = useAuth()

  if (loading) {
    // Show a loading screen
    return <LoadingScreen />
  }

  return (
    <Stack>
      {user ? (
        // User is signed in
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(profile)" options={{ headerShown: false }} />
        </>
      ) : (
        // User is not signed in
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  )
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Elements
        stripe={stripePromise}
        options={{
          fonts: [
            {
              cssSrc: 'https://fonts.googleapis.com/css2?family=Barlow:wght@400'
            }
          ]
        }}
      >
        <ModalProvider loginComponent={() => <div>Login Component</div>}>
          <AuthProvider>
            <RootLayoutNav />
          </AuthProvider>
          <StatusBar style="auto" />
        </ModalProvider>
      </Elements>
    </ThemeProvider>
  )
}
