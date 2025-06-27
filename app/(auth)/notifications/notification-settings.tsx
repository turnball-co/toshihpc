import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, Switch, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
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
  section: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  settingTitle: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 4
  },
  settingDescription: {
    fontSize: 14,
    color: '#687076'
  },
  button: {
    marginTop: 10,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
})

export default function NotificationSettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true)
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [marketingEnabled, setMarketingEnabled] = useState(false)
  const [accountStatusEnabled, setAccountStatusEnabled] = useState(true)
  const [updatesEnabled, setUpdatesEnabled] = useState(true)

  const handleSave = () => {
    // In a real app, you would save these settings to a database
    // For now, we'll just go back
    router.back()
  }

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <IconSymbol name="chevron.left" size={24} color={Colors.light.tint} />
        <ThemedText style={styles.backText}>Back</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title" style={styles.title}>
        Notification Settings
      </ThemedText>
      <ThemedView style={styles.section}>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>Push Notifications</ThemedText>
            <ThemedText style={styles.settingDescription}>Receive notifications on your device</ThemedText>
          </ThemedView>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>Email Notifications</ThemedText>
            <ThemedText style={styles.settingDescription}>Receive notifications via email</ThemedText>
          </ThemedView>
          <Switch
            value={emailEnabled}
            onValueChange={setEmailEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>Marketing Emails</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Receive SPECIAL offers and out-of-this-world deals
            </ThemedText>
          </ThemedView>
          <Switch
            value={marketingEnabled}
            onValueChange={setMarketingEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>Account Status Notifications</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Receive notifications about changes to your account status
            </ThemedText>
          </ThemedView>
          <Switch
            value={accountStatusEnabled}
            onValueChange={setAccountStatusEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>App Updates</ThemedText>
            <ThemedText style={styles.settingDescription}>Get notified about new site features.</ThemedText>
          </ThemedView>
          <Switch
            value={updatesEnabled}
            onValueChange={setUpdatesEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
      </ThemedView>
      <ThemedButton onPress={() => handleSave()} variant="secondary" style={styles.button}>
        <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
      </ThemedButton>
    </ThemedView>
  )
}
