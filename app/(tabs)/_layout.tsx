import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { Tabs } from 'expo-router'
import * as React from 'react'
import { useColorScheme } from 'react-native'

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light'

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol name="house.fill" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Order Services',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol name="checkmark.circle.fill" size={28} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Sign Up',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol name="person.fill" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }: { color: string }) => <IconSymbol name="gear" size={28} color={color} />
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ color }: { color: string }) => (
            <IconSymbol name="questionmark.circle" size={28} color={color} />
          )
        }}
      />
    </Tabs>
  )
}
