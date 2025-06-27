import * as React from 'react'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, Switch } from 'react-native'
import { router } from 'expo-router'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { ThemedButton } from '@/components/ThemedButton'

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
  dataSection: {
    marginBottom: 20
  },
  dataSectionTitle: {
    marginBottom: 12
  },
  dataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  dataItemText: {
    marginLeft: 12,
    fontWeight: '500'
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

export default function PrivacySettingsScreen() {
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [personalizationEnabled, setPersonalizationEnabled] = useState(true)

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
        Privacy Settings
      </ThemedText>
      <ThemedView style={styles.section}>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>Location Services</ThemedText>
            <ThemedText style={styles.settingDescription}>Allow app to access your location</ThemedText>
          </ThemedView>
          <Switch
            value={locationEnabled}
            onValueChange={setLocationEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>Analytics</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Help improve the app by sending anonymous usage data
            </ThemedText>
          </ThemedView>
          <Switch
            value={analyticsEnabled}
            onValueChange={setAnalyticsEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
        <ThemedView style={styles.settingItem}>
          <ThemedView>
            <ThemedText style={styles.settingTitle}>Personalization</ThemedText>
            <ThemedText style={styles.settingDescription}>
              Allow app to personalize your experience based on your activity
            </ThemedText>
          </ThemedView>
          <Switch
            value={personalizationEnabled}
            onValueChange={setPersonalizationEnabled}
            trackColor={{ false: '#D0D0D0', true: Colors.light.tint }}
            thumbColor="#FFFFFF"
          />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.dataSection}>
        <ThemedText type="subtitle" style={styles.dataSectionTitle}>
          Data Management
        </ThemedText>
        <TouchableOpacity style={styles.dataItem}>
          <IconSymbol name="arrow.down.circle" size={20} color={Colors.light.tint} />
          <ThemedText style={styles.dataItemText}>Download My Data</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.dataItem}>
          <IconSymbol name="trash" size={20} color="#F87171" />
          <ThemedText style={[styles.dataItemText, { color: '#F87171' }]}>Delete My Account</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedButton variant="secondary" onPress={() => handleSave()} style={styles.button}>
        <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
      </ThemedButton>
    </ThemedView>
  )
}
