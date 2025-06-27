import * as React from 'react'
import { FC } from 'react'
import { StyleSheet, TextInput as RNTextInput, TextInputProps } from 'react-native'
import { useColorScheme } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors'

interface CustomTextInputProps extends TextInputProps {
  label?: string
  error?: string | false
  helperText?: string
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 4
  },
  label: {
    marginBottom: 6,
    fontWeight: '500'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16
  },
  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 4
  }
})

export const TextInput: FC<CustomTextInputProps> = ({ label, error, style, ...props }) => {
  const colorScheme = useColorScheme() ?? 'light'
  const colors = Colors[colorScheme]

  return (
    <ThemedView style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <RNTextInput
        style={[
          styles.input,
          {
            borderColor: error ? '#F87171' : '#D0D0D0',
            color: colors.text,
            backgroundColor: colorScheme === 'dark' ? '#2A2D2E' : '#F5F5F5'
          },
          style
        ]}
        placeholderTextColor="#9BA1A6"
        {...props}
      />
      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </ThemedView>
  )
}
