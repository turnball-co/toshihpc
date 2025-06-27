import { useAuth } from '@/app/context/AuthContext'
import { useModal } from '@/app/context/ModalContext'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { router } from 'expo-router'
import * as React from 'react'
import { StyleSheet } from 'react-native'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  content: {
    alignItems: 'center',
    maxWidth: 400
  },
  title: {
    marginTop: 20,
    marginBottom: 10
  },
  message: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#687076'
  },
  loginButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  backButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButtonText: {
    fontWeight: '500',
    fontSize: 16
  }
})

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()
  const { showLoginModal } = useModal()

  if (!user) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.content}>
          <IconSymbol name="lock.fill" size={60} color="#808080" />
          <ThemedText type="title" style={styles.title}>
            Authentication Required
          </ThemedText>
          <ThemedText style={styles.message}>You need to be logged in to access this page.</ThemedText>
          <ThemedButton onPress={showLoginModal} style={styles.loginButton}>
            <ThemedText style={styles.buttonText}>Log In</ThemedText>
          </ThemedButton>
          <ThemedButton variant="outline" onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backButtonText}>Go Back</ThemedText>
          </ThemedButton>
        </ThemedView>
      </ThemedView>
    )
  }

  return <>{children}</>
}
