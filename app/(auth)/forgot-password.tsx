import { useAuth } from '@/app/context/AuthContext'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { TextInput } from '@/components/ui/TextInput'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { Formik } from 'formik'
import * as React from 'react'
import { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import apiClient from '@/api'

// Validation schema
const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  backText: {
    marginLeft: 5,
    color: Colors.light.tint,
    fontWeight: '500'
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 10,
    color: '#687076'
  },
  form: {
    width: '100%',
    gap: 16
  },
  button: {
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default function ForgotPasswordScreen() {
  const { forgotPassword } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleForgotPassword = async (values: any) => {
    try {
      setIsSubmitting(true)
      await forgotPassword(values.email)
      Alert.alert('Reset Email Sent', 'Check your email for instructions to reset your password.', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error) {
      console.error('Forgot password error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <IconSymbol name="chevron.left" size={24} color={Colors.light.tint} />
        <ThemedText style={styles.backText}>Back</ThemedText>
      </TouchableOpacity>
      <ThemedView style={styles.header}>
        <IconSymbol size={60} color="#0a7ea4" name="chevron.left.forwardslash.chevron.right" />
        <ThemedText type="title">Forgot Password</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter your email address and we'll send you instructions to reset your password.
        </ThemedText>
      </ThemedView>
      <Formik initialValues={{ email: '' }} validationSchema={ForgotPasswordSchema} onSubmit={handleForgotPassword}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <ThemedView style={styles.form}>
            <TextInput
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={touched.email && errors.email}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <ThemedButton
              variant="secondary"
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              style={styles.button}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Send Reset Link</ThemedText>
              )}
            </ThemedButton>
          </ThemedView>
        )}
      </Formik>
    </ThemedView>
  )
}
