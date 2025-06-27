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
import * as Yup from 'yup'

// Validation schema
const SignupSchema = Yup.object().shape({
  displayName: Yup.string().required('Display name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
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

export default function SignUpScreen() {
  const { signUp, signInWithGoogle } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSignUp = async (values: any) => {
    try {
      setIsSubmitting(true)
      await signUp(values.email, values.password, values.displayName)
      router.replace('/(auth)/verify-email')
    } catch (error) {
      console.error('Sign up error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      setIsSubmitting(true)
      await signInWithGoogle()
      router.replace('/(tabs)')
    } catch (error) {
      console.error('Google sign up error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ParallaxScrollView
      contentContainerStyle={styles.scrollContainer}
      headerImage={<IconSymbol size={100} color="#0a7ea4" name="chevron.left.forwardslash.chevron.right" />}
      headerBackgroundColor={{ dark: '#000', light: '#fff' }}
    >
      <ThemedView style={styles.container}>
        <ThemedView style={styles.header}>
          <IconSymbol size={60} color="#0a7ea4" name="chevron.left.forwardslash.chevron.right" />
          <ThemedText type="title">Create Account</ThemedText>
        </ThemedView>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignUp}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <ThemedView style={styles.form}>
              <TextInput
                label="Full Name"
                value={values.displayName}
                onChangeText={handleChange('displayName')}
                onBlur={handleBlur('displayName')}
                error={touched.displayName && errors.displayName}
                placeholder="Enter your full name"
              />
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
                placeholder="Create a password"
                secureTextEntry
              />
              <TextInput
                label="Confirm Password"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={touched.confirmPassword && errors.confirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
              />
              <ThemedButton
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                style={styles.button}
                variant="secondary"
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
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
        <ThemedButton onPress={handleGoogleSignUp} variant="outline" style={styles.googleButton}>
          <IconSymbol name="g.circle.fill" size={20} color="#DB4437" />
          <ThemedText style={styles.googleButtonText}>Continue with Google</ThemedText>
        </ThemedButton>
        <ThemedView style={styles.footer}>
          <ThemedText>Already have an account?</ThemedText>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/login')}>
            <ThemedText style={styles.link}>Log In</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}
