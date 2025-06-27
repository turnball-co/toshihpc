import apiClient, { getUserById } from '@/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { AxiosResponse } from 'axios'
import * as React from 'react'
import { createContext, ReactElement, ReactNode, useContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { GoogleAuthProvider } from 'firebase/auth'
import * as Yup from 'yup'

// Type definitions
export interface User {
  userId: string;
  email: string;
  displayName?: string;
  username: string;
  photoUrl?: string;
  phoneNumber?: string | null;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  dateSignup?: number;
  companyName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  stateCode?: string;
  zip?: string;
  countryCode?: string;
  billingAddress1?: string;
  billingAddress2?: string;
  billingCity?: string;
  billingStateCode?: string;
  billingZip?: string;
  billingCountryCode?: string;
  tosAccepted?: boolean;
}

interface AuthError extends Error {
  code?: string;
  cause?: string;
  message: string;
}

export type AuthContextType = {
  email: any;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  updateProfile: (data: {
    displayName?: string;
    photoURL?: string;
    email?: string;
    phoneNumber?: string | null;
  }) => Promise<void>;
  isEmailVerified: () => Promise<boolean>;
}

const SignupSchema = Yup.object().shape({
  displayName: Yup.string().required('Display name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required')
})

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Implementation of onAuthStateChanged
function onAuthStateChanged(auth: AxiosResponse<any, any>, callback: (authData: any) => void) {
  // Simulate listening to auth state changes by immediately calling the callback with auth.data
  // In a real app, this would be a subscription to an auth state event
  if (auth && auth.data) {
    callback(auth.data)
  } else {
    callback(null)
  }
  // Return an unsubscribe function (no-op here)
  return () => {}
}

const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setUserData] = useState<any>(null)

  useEffect(() => {
    const initializeAuth = async (email: string, password: string) => {
      try {
        const auth = await apiClient.post(`${process.env.BACKEND_API}/login`, {
          email,
          password
        })
        const unsubscribe = onAuthStateChanged(auth, async (authData: any) => {
          if (authData) {
            // Check if we should keep the user logged in
            const rememberMe = await AsyncStorage.getItem('rememberMe')
            if (rememberMe === 'true') {
              setUser(authData || null)
            } else {
              // If rememberMe is not set, check if the session is still valid
              const lastLoginTime = await AsyncStorage.getItem('lastLoginTime')
              if (lastLoginTime) {
                const lastLogin = new Date(lastLoginTime)
                const now = new Date()
                const hoursSinceLastLogin = (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60)
                // If it's been less than 24 hours, keep the user logged in
                if (hoursSinceLastLogin < 24) {
                  setUser(authData || null)
                } else {
                  // Log the user out if it's been more than 24 hours
                  await apiClient.post('/signOut', { authData })
                  setUser(null)
                }
              } else {
                setUser(authData || null)
              }
            }
          } else {
            setUser(null)
          }
          setLoading(false)
        })
        return () => {
          unsubscribe()
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    let unsubscribe: (() => void) | undefined

    apiClient.get('/login').then((response) => {
      if (typeof response.data === 'function') {
        unsubscribe = response.data
      }
    })
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const fetchUserFromBackend = async (userId: string) => {
    try {
      const response = await getUserById(userId)
      if (response && response.data) {
        setUser(response.data)
      }
    } catch (error) {
      console.error('Failed to fetch user from backend:', error)
    }
  }

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const userCredential = await apiClient.post('/signup', {
        email,
        password,
        displayName
      })
      // Update the user's profile with the display name
      await apiClient.put(`/users/${userCredential.data.id}`, {
        displayName
      })

      // Send email verification
      await apiClient.post('/send-email-verification', {
        userId: userCredential.data.id
      })

      setUser(userCredential.data)

      // After successful sign up, fetch user data from backend
      if (userCredential?.data?.id) {
        await fetchUserFromBackend(userCredential.data.id)
      }

      // Set last login time
      await AsyncStorage.setItem('lastLoginTime', new Date().toISOString())
    } catch (err) { 
      const error = err as AuthError;
      let errorMessage = 'Failed to create account'

      if (error.cause === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use'
      } else if (error.cause === 'auth/invalid-email') {
        errorMessage = 'Invalid email address'
      } else if (error.cause === 'auth/weak-password') {
        errorMessage = 'Password is too weak'
      } else if (error.message) {
        errorMessage = error.message
      }

      Alert.alert('Error', errorMessage)
      throw error
    }
  }

  const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const userCredential = await apiClient.post('/user', { email, password })
      setUser(userCredential.data)

      // Save rememberMe preference
      await AsyncStorage.setItem('rememberMe', rememberMe ? 'true' : 'false')

      // After successful sign in, fetch user data from backend
      if (userCredential?.data?._id) {
        await fetchUserFromBackend(userCredential.data._id)
      }

      // Set last login time
      await AsyncStorage.setItem('lastLoginTime', new Date().toISOString())
    } catch (err) {
      const error = err as AuthError;
      let errorMessage = 'Failed to sign in';

      if (error.cause === 'auth/user-not-found' || error.cause === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password';
      } else if (error.cause === 'auth/invalid-email') {
        errorMessage = 'Invalid email address';
      } else if (error.cause === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
      throw error;
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Get the user's ID token
      await GoogleSignin.hasPlayServices()
      const { idToken } = await GoogleSignin.getTokens()

      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken)

      // Sign in with the credential
      const userCredential = await apiClient.post('/login', { auth: idToken })
      setUser(userCredential.data)

      // Set rememberMe to true for Google sign-in
      await AsyncStorage.setItem('rememberMe', 'true')

      // Set last login time
      await AsyncStorage.setItem('lastLoginTime', new Date().toISOString())
    } catch (error: any) {
      console.error('Google sign in error:', error)
      Alert.alert('Error', 'Failed to sign in with Google')
      throw error
    }
  }
  const signOut = async () => {
    try {
      const signOutResponse = await apiClient.post('/logout')
      if (signOutResponse.status === 200) {
        console.log('Sign out successful')
      } else {
        console.log('Sign out failed')
      }
      // Sign out from Firebase
      setUser(null)

      // Clear stored preferences
      await AsyncStorage.removeItem('rememberMe')
      await AsyncStorage.removeItem('lastLoginTime')

      // Sign out from Google as well
      if (await GoogleSignin.getCurrentUser()) {
        await GoogleSignin.signOut()
      }
    } catch (error) {
      console.error('Sign out error:', error)
      throw error
    }
  }
  const verifyEmail = async () => {
    if (!user) {
      throw new Error('No user is signed in')
    }

    try {
      await apiClient.post('/send-email-verification', { userId: user.userId })
    } catch (error) {
      console.error('Send verification error:', error)
      throw error
    }
  }

  const isEmailVerified = async () => {
    if (!user) {
      return false
    }

    try {
      // Reload the user to get the latest data
      const response = await apiClient.get(`/users/${user.userId}`)
      if (response.data) {
        setUser(response.data)
      }
      return user.emailVerified ?? false
    } catch (error) {
      console.error('Check verification error:', error)
      return false
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      await apiClient.post('/send-forgot-password', { email })
    } catch (err) {
      const error = err as AuthError
      let errorMessage = 'Failed to send reset email'

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address'
      } else if (error.message) {
        errorMessage = error.message
      }

      Alert.alert('Error', errorMessage)
      throw error
    }
  }

  const updateProfile = async (data: {
    displayName?: string
    photoUrl?: string
    email?: string
    phoneNumber?: string | null
  }) => {
    if (!user) {
      throw new Error('No user is signed in')
    }

    try {
      // Update display name and photo URL
      if (data.displayName || data.photoUrl) {
        await apiClient.post(`/users/${user.userId}`, {
          userId: user.userId,
          displayName: data.displayName || user.displayName,
          photoUrl: data.photoUrl || user.photoUrl
        })
      }

      // Update email
      if (data.email && data.email !== user.email) {
        await apiClient.post('/users/update-email', {
          userId: user.userId,
          email: data.email
        })
        await apiClient.post('/users/email-verification', {
          userId: user.userId
        })
        Alert.alert(
          'Email Updated',
          'Your email has been updated. A verification email has been sent to your new address. Please check your inbox and click the verification link.'
        )
      }
      await fetchUserFromBackend(user.userId)
    } catch (err) {
      const error = err as AuthError;
      let errorMessage = 'Failed to update profile';

      if (error.code === 'auth/requires-recent-login') {
        errorMessage =
          'This operation is sensitive and requires recent authentication. Please log in again before retrying.';
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use by another account';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Error', errorMessage);
      throw err;
    }
  }

  const value = {
    email: user?.email || null,
    user,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    verifyEmail,
    forgotPassword,
    updateProfile,
    isEmailVerified
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
export default AuthContext
export { SignupSchema }
