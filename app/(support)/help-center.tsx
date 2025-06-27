import * as React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { router } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { Collapsible } from '@/components/Collapsible'

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
  scrollView: {
    flex: 1
  },
  contactButton: {
    marginTop: 20,
    marginBottom: 30,
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    alignItems: 'center'
  },
  contactButtonText: {
    color: Colors.light.tint,
    fontWeight: '500'
  }
})

export default function HelpCenterScreen() {
  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <IconSymbol name="chevron.left" size={24} color={Colors.light.tint} />
        <ThemedText style={styles.backText}>Back</ThemedText>
      </TouchableOpacity>
      <ThemedText type="title" style={styles.title}>
        Help Center
      </ThemedText>
      <ParallaxScrollView
        style={styles.scrollView}
        headerImage={<IconSymbol name="questionmark.circle" size={100} color={Colors.light.tint} />}
        headerBackgroundColor={{ dark: '#000', light: '#fff' }}
      >
        <>
          <Collapsible title="How do I create an account?">
            <ThemedText>
              To create an account, tap on the "Sign Up" button on the login screen. Fill in your details including your
              name, email address, and password. After submitting, you'll receive a verification email to confirm your
              account.
            </ThemedText>
          </Collapsible>
          <Collapsible title="How do I reset my password?">
            <ThemedText>
              If you've forgotten your password, tap on the "Forgot Password" link on the login screen. Enter your email
              address, and we'll send you instructions to reset your password.
            </ThemedText>
          </Collapsible>
          <Collapsible title="How do I update my profile information?">
            <ThemedText>
              To update your profile, go to the Profile tab and tap on "Edit Profile". From there, you can change your
              name, profile picture, and other information.
            </ThemedText>
          </Collapsible>
          <Collapsible title="How do I change my notification settings?">
            <ThemedText>
              To manage your notification preferences, go to the Profile tab, then tap on "Notification Settings". You
              can toggle different types of notifications on or off according to your preferences.
            </ThemedText>
          </Collapsible>
          <Collapsible title="How do I delete my account?">
            <ThemedText>
              To delete your account, go to the Profile tab, then tap on "Privacy Settings". Scroll down to find the
              "Delete My Account" option. Please note that this action is permanent and cannot be undone.
            </ThemedText>
          </Collapsible>
          <TouchableOpacity style={styles.contactButton} onPress={() => router.push('/(support)/contact-us')}>
            <ThemedText style={styles.contactButtonText}>Can't find what you're looking for? Contact Us</ThemedText>
          </TouchableOpacity>
        </>
      </ParallaxScrollView>
    </ThemedView>
  )
}
