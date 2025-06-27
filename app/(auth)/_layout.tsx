import { Stack } from 'expo-router'
import * as React from 'react'

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="notifications" />
      <Stack.Screen name="user-profile" />
    </Stack>
  )
}
