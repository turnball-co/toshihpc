import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { router } from 'expo-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { Colors } from '@/constants/Colors'
import { TextInput } from '@/components/ui/TextInput'
import { ThemedButton } from '@/components/ThemedButton'
import ParallaxScrollView from '@/components/ParallaxScrollView'

// Validation schema
const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required').min(10, 'Message is too short')
})

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
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
    marginBottom: 16,
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
    color: '#687076'
  },
  form: {
    width: '100%',
    gap: 16
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
    paddingTop: 12
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
  },
  alternativeContact: {
    marginTop: 40,
    marginBottom: 20
  },
  alternativeTitle: {
    marginBottom: 16
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  contactText: {
    marginLeft: 12
  }
})

export default function ContactUsScreen() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: any) => {
    try {
      setIsSubmitting(true)

      // In a real app, you would send this data to your backend
      console.log('Contact form submitted:', values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      Alert.alert('Message Sent', 'Thank you for contacting us. We will get back to you soon.', [
        { text: 'OK', onPress: () => router.back() }
      ])
    } catch (error) {
      console.error('Contact form error:', error)
      Alert.alert('Error', 'Failed to send message. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ParallaxScrollView
      contentContainerStyle={styles.scrollContainer}
      headerImage={<IconSymbol name="envelope.fill" size={100} color={Colors.light.tint} />}
      headerBackgroundColor={{ dark: '#000', light: '#fff' }}
    >
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={Colors.light.tint} />
          <ThemedText style={styles.backText}>Back</ThemedText>
        </TouchableOpacity>
        <ThemedText type="title" style={styles.title}>
          Contact Us
        </ThemedText>
        <ThemedText style={styles.description}>
          Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
        </ThemedText>
        <Formik
          initialValues={{ name: '', email: '', subject: '', message: '' }}
          validationSchema={ContactSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <ThemedView style={styles.form}>
              <TextInput
                label="Name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                error={touched.name && errors.name}
                placeholder="Enter your name"
              />
              <TextInput
                label="Email"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                label="Subject"
                value={values.subject}
                onChangeText={handleChange('subject')}
                onBlur={handleBlur('subject')}
                error={touched.subject && errors.subject}
                placeholder="What is this regarding?"
              />
              <TextInput
                label="Message"
                value={values.message}
                onChangeText={handleChange('message')}
                onBlur={handleBlur('message')}
                error={touched.message && errors.message}
                placeholder="How can we help you?"
                multiline
                numberOfLines={5}
                style={styles.messageInput}
              />
              <ThemedButton onPress={() => handleSubmit()} disabled={isSubmitting} style={styles.button}>
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ThemedText style={styles.buttonText}>Send Message</ThemedText>
                )}
              </ThemedButton>
            </ThemedView>
          )}
        </Formik>
        <ThemedView style={styles.alternativeContact}>
          <ThemedText type="subtitle" style={styles.alternativeTitle}>
            Other Ways to Reach Us
          </ThemedText>
          <ThemedView style={styles.contactMethod}>
            <IconSymbol name="envelope.fill" size={20} color="#808080" />
            <ThemedText style={styles.contactText}>support@toshihpc.com</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactMethod}>
            <IconSymbol name="phone.fill" size={20} color="#808080" />
            <ThemedText style={styles.contactText}>(555) 123-4567</ThemedText>
          </ThemedView>
          <ThemedView style={styles.contactMethod}>
            <IconSymbol name="location.fill" size={20} color="#808080" />
            <ThemedText style={styles.contactText}>123 Tech Lane, Columbus, OH 43210</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  )
}
