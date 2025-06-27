import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { TextInput } from '@/components/ui/TextInput'
import * as React from 'react'
import { useState } from 'react'

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleResetPassword = () => {
    // Logic for resetting the password agains backend api
    // This is a placeholder function. You should replace it with your actual API call.
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    if (!email || !newPassword) {
      alert('Please fill in all fields')
      return
    }
    // Call your API to reset the password
    // For example:
    // await api.resetPassword(email, newPassword)
    // Then navigate back or show a success message
    // router.back()
    // For now, just log the email and new password
    // and show an alert
    alert('Password reset successfully')
    console.log('Resetting password for:', email)
  }

  return (
    <ThemedView style={{ padding: 20 }}>
      <ThemedText style={{ fontSize: 24, marginBottom: 20 }}>Reset Password</ThemedText>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
      <ThemedButton variant="secondary" onPress={handleResetPassword}>
        Reset Password
      </ThemedButton>
    </ThemedView>
  )
}

export default ResetPasswordScreen
