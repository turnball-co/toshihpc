import { Stack } from 'expo-router'
import * as React from 'react'

export default function AuthAdminLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="admin-home" />
      <Stack.Screen name="users" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="instances" />
    </Stack>
  )
}
