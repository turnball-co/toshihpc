import { useAuth } from '@/app/context/AuthContext'
import { useModal } from '@/app/context/ModalContext'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { TextInput } from '@/components/ui/TextInput'
import { Colors } from '@/constants/Colors'
import { Formik } from 'formik'
import * as React from 'react'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%'
  },
  title: {
    marginBottom: 24,
    textAlign: 'center'
  },
  form: {
    width: '100%',
    gap: 16
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint
  },
  rememberMeText: {
    fontSize: 14
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
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#D0D0D0'
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#687076'
  },
  googleButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  googleButtonText: {
    marginLeft: 8,
    fontWeight: '500'
  }
})

export default function LoginModal() {
  const { signIn, signInWithGoogle } = useAuth()
  const { hideModal } = useModal()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      setIsSubmitting(true)
      await signIn(values.email, values.password, rememberMe)
      hideModal()
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsSubmitting(true)
      await signInWithGoogle()
      hideModal()
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Log In
      </ThemedText>
      <Formik initialValues={{ email: '', password: '' }} validationSchema={LoginSchema} onSubmit={handleLogin}>
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
            <TextInput
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={touched.password && errors.password}
              placeholder="Enter your password"
              secureTextEntry
            />
            <TouchableOpacity style={styles.rememberMeContainer} onPress={() => setRememberMe(!rememberMe)}>
              <ThemedView style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <IconSymbol name="checkmark" size={12} color="#fff" />}
              </ThemedView>
              <ThemedText style={styles.rememberMeText}>Remember me</ThemedText>
            </TouchableOpacity>
            <ThemedButton
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
              style={styles.button}
              variant="secondary"
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ThemedText style={styles.buttonText}>Log In</ThemedText>
              )}
            </ThemedButton>
          </ThemedView>
        )}
      </Formik>
      <ThemedView style={styles.dividerContainer}>
        <ThemedView style={styles.divider} />
        <ThemedText style={styles.dividerText}>OR</ThemedText>
        <ThemedView style={styles.divider} />
      </ThemedView>
      <ThemedButton variant="outline" onPress={handleGoogleLogin} disabled={isSubmitting} style={styles.googleButton}>
        <ThemedView style={styles.googleButtonContent}>
          <IconSymbol name="g.circle.fill" size={24} color="#4285F4" />
          <ThemedText style={styles.googleButtonText}>Continue with Google</ThemedText>
        </ThemedView>
      </ThemedButton>
    </ThemedView>
  )
}
