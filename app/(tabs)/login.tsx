import { useAuth } from '@/app/context/AuthContext'
import ParallaxScrollView from '@/components/ParallaxScrollView'
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
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native'
import { Checkbox } from 'react-native-paper'
import * as Yup from 'yup'

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
})

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 30
  },
  form: {
    width: '100%',
    gap: 16
  },
  rememberForgot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center'
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '100%'
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#D0D0D0'
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#687076'
  },
  googleButton: {
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  googleButtonText: {
    marginLeft: 10,
    fontWeight: '500'
  },
  footer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 5
  },
  link: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  }
})

export default function LoginScreen() {
  const { signIn, signInWithGoogle } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (values: any) => {
    try {
      setIsSubmitting(true)
      await signIn(values.email, values.password, rememberMe)
      router.replace('/(tabs)')
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
      router.replace('/(tabs)')
    } catch (error) {
      console.error('Google login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ParallaxScrollView
      contentContainerStyle={styles.scrollContainer}
      headerImage={<ThemedView style={{ height: 200, backgroundColor: Colors.light.tint }} />}
      headerBackgroundColor={{ dark: '#000', light: '#fff' }}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <IconSymbol size={60} color="#0a7ea4" name="chevron.left.forwardslash.chevron.right" />
          <ThemedText type="title">Welcome Back</ThemedText>
        </ThemedView>
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
              <ThemedView style={styles.rememberForgot}>
                <ThemedView style={styles.rememberMe}>
                  <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => setRememberMe(!rememberMe)}
                    color={Colors.light.tint}
                  />
                  <ThemedText>Remember me</ThemedText>
                </ThemedView>
                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
                  <ThemedText style={styles.link}>Forgot Password?</ThemedText>
                </TouchableOpacity>
              </ThemedView>
              <ThemedButton
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                variant="secondary"
                style={styles.button}
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
        <ThemedView style={styles.divider}>
          <ThemedView style={styles.dividerLine} />
          <ThemedText style={styles.dividerText}>or</ThemedText>
          <ThemedView style={styles.dividerLine} />
        </ThemedView>
        <ThemedButton onPress={handleGoogleLogin} variant="outline" style={styles.googleButton}>
          <IconSymbol name="g.circle.fill" size={20} color="#DB4437" />
          <ThemedText style={styles.googleButtonText}>Continue with Google</ThemedText>
        </ThemedButton>
        <ThemedView style={styles.footer}>
          <ThemedText>Don't have an account?</ThemedText>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/signup')}>
            <ThemedText style={styles.link}>Sign Up</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}
