import { useAuth } from '@/app/context/AuthContext'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedButton } from '@/components/ThemedButton'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { CardElement, useStripe } from '@stripe/react-stripe-js'
import * as React from 'react'
import { useState } from 'react'
import { Alert, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute'
  },
  container: {
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16
  },
  description: {
    fontSize: 16,
    marginBottom: 16
  },
  cardContainer: {
    height: 50,
    marginVertical: 16
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8
  }
})

const OrderScreen = () => {
  const stripe = useStripe()

  const [cardDetails, setCardDetails] = useState<{
    complete: boolean
  } | null>(null)
  const user = useAuth()

  const handleSubscribe = async () => {
    try {
      // Call your backend to create nnmmmma subscription and get the payment intent client secret
      const response = await fetch(`${process.env.BACKEND_API}/user-purchase`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan: 'server-rental-monthly',
          email: user.email
        })
      })
      console.log('Response from user-purchase:', response)
      const { clientSecret } = await response.json()
      console.log('Client Secret:', clientSecret)
      // Confirm the payment with Stripe
      const confirmPaymentResult = await stripe?.confirmPayment({
        clientSecret,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              email: user.email
            }
          },
          return_url: process.env.BACKEND_API + '/order-success'
        }
      })

      const error = confirmPaymentResult?.error
      const paymentIntent =
        confirmPaymentResult && 'paymentIntent' in confirmPaymentResult ? confirmPaymentResult.paymentIntent : null

      if (error) {
        Alert.alert('Payment failed', error.message)
      } else if (paymentIntent) {
        Alert.alert('Success', 'Subscription created successfully!')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Something went wrong. Please try again.')
    }
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<IconSymbol size={310} color="#808080" name="checkmark.circle.fill" style={styles.headerImage} />}
    >
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Subscribe to Server Rentals</ThemedText>
        <ThemedText style={styles.description}>Rent dedicated hardware instances on a monthly basis.</ThemedText>
        <CardElement
          options={{
            style: {
              base: {
                backgroundColor: styles.card.backgroundColor
                // height: `${styles.cardContainer.height}px`,
                // marginVertical: `${styles.cardContainer.marginVertical}px`,
                // borderRadius is not supported by StripeElementStyleVariant
              }
            }
          }}
          onChange={(event: any) => setCardDetails(event.complete ? { complete: event.complete } : null)}
        />
        <ThemedButton onPress={handleSubscribe} disabled={!cardDetails?.complete}>
          Subscribe
        </ThemedButton>
        <ThemedText style={styles.description}>Your subscription will renew automatically each month.</ThemedText>
        <ThemedText style={styles.description}>
          Please ensure your payment method is valid to avoid service interruption.
        </ThemedText>
        <ThemedText style={styles.description}>
          If you have any questions, feel free to contact our support team.
        </ThemedText>
        <ThemedText style={styles.description}>Thank you for choosing our service!</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  )
}

export default OrderScreen
