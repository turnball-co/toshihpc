import { useAuth } from '@/app/context/AuthContext'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { TextInput } from '@/components/ui/TextInput'
import { Colors } from '@/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { router } from 'expo-router'
import { Formik } from 'formik'
import * as React from 'react'
import { useState } from 'react'
import { ActivityIndicator, Alert, Image, StyleSheet, TouchableOpacity } from 'react-native'
import * as Yup from 'yup'
import ParallaxScrollView from '../ParallaxScrollView'

// Validation schema
const ProfileSchema = Yup.object().shape({
  displayName: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.string().nullable()
})

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
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
  title: {
    marginBottom: 24,
    textAlign: 'center'
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 24
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 8
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.light.tint,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileInitial: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold'
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.tint,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff'
  },
  changePhotoText: {
    color: Colors.light.tint,
    fontSize: 14
  },
  form: {
    width: '100%',
    gap: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelButtonText: {
    fontWeight: '500'
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  infoSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8
  },
  infoText: {
    fontSize: 14,
    color: '#687076'
  }
})

export function EditProfileContent() {
  const { user, updateProfile } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(user?.photoUrl || null)

  const handlePickImage = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need permission to access your photos to set a profile picture.')
      return
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7
    })

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri)
    }
  }

  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true)

      // In a real app, you would upload the image to storage and get a URL
      // For this example, we'll just use the local URI
      const photoURL = profileImage

      await updateProfile({
        displayName: values.displayName,
        photoURL: photoURL || undefined,
        email: values.email !== user?.email ? values.email : undefined,
        phoneNumber: values.phoneNumber
      })

      Alert.alert('Profile Updated', 'Your profile has been successfully updated.', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error) {
      console.error('Update profile error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return null // This should be handled by the ProtectedRoute component
  }

  return (
    <ParallaxScrollView
      contentContainerStyle={styles.scrollContainer}
      headerImage={<Image source={{ uri: profileImage || '' }} style={{ width: '100%', height: 200 }} />}
      headerBackgroundColor={{ dark: '#000', light: '#fff' }}
    >
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.tint} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>
          Edit Profile
        </ThemedText>
        <ThemedView style={styles.profileImageSection}>
          <ThemedView style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <ThemedView style={styles.profileImagePlaceholder}>
                <ThemedText style={styles.profileInitial}>
                  {user.displayName ? user.displayName[0].toUpperCase() : 'U'}
                </ThemedText>
              </ThemedView>
            )}
            <TouchableOpacity style={styles.editImageButton} onPress={handlePickImage}>
              <IconSymbol name="camera.fill" size={16} color="#fff" />
            </TouchableOpacity>
          </ThemedView>
          <ThemedText style={styles.changePhotoText}>Tap to change profile photo</ThemedText>
        </ThemedView>
        <Formik
          initialValues={{
            displayName: user.displayName || '',
            email: user.email || '',
            phoneNumber: user.phoneNumber || ''
          }}
          validationSchema={ProfileSchema}
          onSubmit={handleSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <ThemedView style={styles.form}>
              <TextInput
                label="Name"
                value={values.displayName}
                onChangeText={handleChange('displayName')}
                onBlur={handleBlur('displayName')}
                error={touched.displayName && errors.displayName}
                placeholder="Enter your name"
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
                helperText="Changing your email will require verification"
              />
              <TextInput
                label="Phone Number"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                error={touched.phoneNumber && errors.phoneNumber}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
              <ThemedView style={styles.buttonContainer}>
                <ThemedButton
                  variant="outline"
                  onPress={() => router.back()}
                  style={styles.cancelButton}
                  disabled={isSubmitting}
                >
                  <ThemedText style={styles.cancelButtonText}>Cancel</ThemedText>
                </ThemedButton>
                <ThemedButton onPress={() => handleSubmit()} style={styles.saveButton} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <ThemedText style={styles.saveButtonText}>Save Changes</ThemedText>
                  )}
                </ThemedButton>
              </ThemedView>
            </ThemedView>
          )}
        </Formik>
        <ThemedView style={styles.infoSection}>
          <ThemedText style={styles.infoText}>
            <IconSymbol name="info.circle" size={14} color="#687076" /> Changes to your profile will be visible to other
            users.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}
