import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { TextInput } from '@/components/ui/TextInput'
import * as React from 'react'
import { useState } from 'react'

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      console.error('New password and confirm password do not match.')
      return
    }

    if (!currentPassword || !newPassword) {
      console.error('Please fill in all fields.')
      return
    }

    console.log('Password changed successfully!')
  }

  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedText style={{ fontSize: 24, marginBottom: 20 }}>Change Password</ThemedText>
      <TextInput
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{ marginBottom: 10, borderWidth: 1, padding: 10 }}
      />
      <TextInput
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ marginBottom: 20, borderWidth: 1, padding: 10 }}
      />
      <ThemedButton onPress={handleChangePassword}>Change Password</ThemedButton>
    </ThemedView>
  )
}

export default ChangePasswordScreen
