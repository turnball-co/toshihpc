import { useAuth } from '@/app/context/AuthContext'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center'
  },
  icon: {
    marginBottom: 20
  },
  title: {
    marginBottom: 16,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16
  },
  emailText: {
    fontWeight: 'bold'
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#687076'
  },
  button: {
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
  resendButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  resendButtonText: {
    fontWeight: '500'
  },
  signOutButton: {
    marginTop: 20
  },
  signOutButtonText: {
    color: '#F87171'
  }
})

export default function VerifyEmailScreen() {
  const { user, verifyEmail, isEmailVerified, signOut } = useAuth()
  const [checking, setChecking] = useState(false)
  const [resending, setResending] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (!user) {
      router.replace('/(tabs)/login')
    }
  }, [user])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const checkVerification = async () => {
    try {
      setChecking(true)
      const verified = await isEmailVerified()

      if (verified) {
        Alert.alert('Email Verified', 'Your email has been verified successfully!', [
          { text: 'Continue', onPress: () => router.replace('/(tabs)') }
        ])
      } else {
        Alert.alert(
          'Not Verified',
          'Your email has not been verified yet. Please check your inbox and click the verification link.'
        )
      }
    } catch (error) {
      console.error('Verification check error:', error)
    } finally {
      setChecking(false)
    }
  }

  const resendVerification = async () => {
    try {
      setResending(true)
      await verifyEmail()
      setCountdown(60) // Set a 60-second countdown before allowing resend
    } catch (error) {
      console.error('Resend verification error:', error)
    } finally {
      setResending(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.replace('/(tabs)/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <IconSymbol size={80} color="#0a7ea4" name="envelope.circle.fill" style={styles.icon} />
        <ThemedText type="title" style={styles.title}>
          Verify Your Email
        </ThemedText>
        <ThemedText style={styles.description}>
          We've sent a verification email to <ThemedText style={styles.emailText}>{user?.email}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.instructions}>
          Please check your inbox and click the verification link to complete your registration. If you don't see the
          email, check your spam folder.
        </ThemedText>
        <ThemedButton onPress={checkVerification} disabled={checking} style={styles.button} variant="secondary">
          {checking ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText style={styles.buttonText}>I've Verified My Email</ThemedText>
          )}
        </ThemedButton>
        <ThemedButton
          onPress={resendVerification}
          disabled={resending || countdown > 0}
          variant="secondary"
          style={styles.resendButton}
        >
          {resending ? (
            <ActivityIndicator color={Colors.light.tint} />
          ) : countdown > 0 ? (
            <ThemedText style={styles.resendButtonText}>Resend Email ({countdown}s)</ThemedText>
          ) : (
            <ThemedText style={styles.resendButtonText}>Resend Verification Email</ThemedText>
          )}
        </ThemedButton>
        <ThemedButton onPress={handleSignOut} variant="secondary" style={styles.signOutButton}>
          <ThemedText style={styles.signOutButtonText}>Sign Out</ThemedText>
        </ThemedButton>
      </ThemedView>
    </ThemedView>
  )
}
