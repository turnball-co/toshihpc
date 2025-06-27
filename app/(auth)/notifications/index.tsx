import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import * as React from 'react'

const NotificationsScreen = () => {
  return (
    <ThemedView>
      <ThemedText>Notifications</ThemedText>
      <ThemedText>New Notifications, dataview list of notifications whether they're unread or not.</ThemedText>
      <ThemedText>
        Additional information can be displayed here. More updates will be shown here as they arrive. Check back for the
        latest updates!
      </ThemedText>
      <ThemedText>Check your settings to customize your notification preferences.</ThemedText>
      <ThemedText>Don't forget to mark notifications as read to keep your list organized.</ThemedText>
      <ThemedText>Stay tuned for more features coming soon!</ThemedText>
    </ThemedView>
  )
}

export default NotificationsScreen
