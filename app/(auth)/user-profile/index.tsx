import * as React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import UserProfileForm from '@/components/UserProfileForm'

const UserProfileScreen = () => {
  return (
    <ThemedView>
      <ThemedText>User Profile Details</ThemedText>
      <UserProfileForm />
    </ThemedView>
  )
}

export default UserProfileScreen
