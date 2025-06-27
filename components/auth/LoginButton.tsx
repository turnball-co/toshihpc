import { useModal } from '@/app/context/ModalContext'
import { ThemedText } from '@/components/ThemedText'
import { Colors } from '@/constants/Colors'
import * as React from 'react'
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'

interface LoginButtonProps {
  style?: ViewStyle
  textStyle?: ViewStyle
  text?: string
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export function LoginButton({ style, textStyle, text = 'Log In' }: LoginButtonProps) {
  const { showLoginModal } = useModal()

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={showLoginModal}>
      <ThemedText style={[styles.text, textStyle as any]}>{text}</ThemedText>
    </TouchableOpacity>
  )
}
