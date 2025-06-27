import { useAuth } from '@/app/context/AuthContext'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { TextInput } from '@/components/ui/TextInput'
import axios from 'axios'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import apiClient from '@/api'

interface UserData {
  photoURL?: string;
  displayName?: string;
  email?: string;
  username?: string;
  phone?: string;
  address_1?: string;
  address_2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  date_joined?: string;
  date_verified?: string;
  billing_city?: string;
  billing_state?: string;
  billing_zip?: string;
  billing_country?: string
  billing_address_1?: string
  billing_address_2?: string
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  inputGroup: {
    marginBottom: 12
  },
  label: {
    fontSize: 14,
    marginBottom: 4
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    fontSize: 16
  }
})

const UserProfileForm = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (user !== null) {
      const uuid = user.userId
      // Retrieve user data from database backend API using uuid
      const fetchUserData = async () => {
        setLoading(true)
        setError(null)
        try {
          const response = await axios.get(`${process.env.BACKEND_API}/users/${uuid}`)
          setUserData(response.data)
        } catch (err) {
          setError('Failed to fetch user data.')
          console.error(err)
        } finally {
          setLoading(false)
        }
      }

      fetchUserData()
    }
  }, [user])

  const [formData, setFormData] = useState<UserData | null>(userData)

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value })
  }
  useEffect(() => {
    if (userData) {
      setFormData(userData)
    }
  }, [userData])

  const handleSubmit = async () => {
    console.log('Form submitted:', formData)

    if (!user || !formData) {
      setError('User is not authenticated or form data is missing.')
      return
    }

    const uuid = user.userId

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Send a PUT request to update user data in the backend
      await axios.put(`${process.env.BACKEND_API}/users/${uuid}`, formData)

      setSuccess('Profile updated successfully!')
    } catch (err) {
      setError('Failed to update profile.')
      console.error('Error updating profile:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <ThemedText>Loading...</ThemedText>
  }

  if (error) {
    return <ThemedText>{error}</ThemedText>
  }

  return (
    <ParallaxScrollView headerImage={<></>} headerBackgroundColor={{ dark: '#000000', light: '#FFFFFF' }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Edit User Profile</ThemedText>
        {formData &&
          (Object.keys(formData) as (keyof typeof formData)[]).map((key) => (
            <ThemedView key={key} style={styles.inputGroup}>
              <ThemedText style={styles.label}>{key.replace(/_/g, ' ')}</ThemedText>
              <TextInput
                style={styles.input}
                value={formData[key]}
                onChangeText={(value) => handleChange(key, value)}
                editable={!key.startsWith('date_')} // Make date fields read-only
              />
            </ThemedView>
          ))}
        <ThemedButton onPress={handleSubmit}>Save Changes</ThemedButton>
      </ThemedView>
    </ParallaxScrollView>
  )
}

export default UserProfileForm
