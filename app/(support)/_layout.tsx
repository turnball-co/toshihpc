import * as React from 'react'
import { Stack } from 'expo-router'

export default function SupportLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="help-center" />
      <Stack.Screen name="contact-us" />
    </Stack>
  )
}
