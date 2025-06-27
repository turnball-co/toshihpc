import { Colors } from '@/constants/Colors'
import * as React from 'react'
import { FC } from 'react'
import { StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, useColorScheme, ViewStyle } from 'react-native'

interface ThemedButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  disabled: {
    opacity: 0.7
  }
})

export const ThemedButton: FC<ThemedButtonProps> = ({ children, variant = 'primary', style, disabled, ...props }) => {
  const colorScheme = useColorScheme() ?? 'light'
  const colors = Colors[colorScheme]

  const getButtonStyle = () => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: disabled ? '#D0D0D0' : colors.tint
        }
      case 'text':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0
        }
      case 'secondary':
        return {
          backgroundColor: disabled ? '#D0D0D0' : colors.tint,
          borderWidth: 0
        }
      case 'primary':
      default:
        return {
          backgroundColor: disabled ? '#D0D0D0' : colors.tint,
          borderWidth: 0
        }
    }
  }

  const buttonStyle: ViewStyle = getButtonStyle()
  switch (variant) {
    case 'primary':
    case 'secondary':
      buttonStyle.backgroundColor = disabled ? '#D0D0D0' : colors.tint
      break
    case 'text':
      buttonStyle.backgroundColor = 'transparent'
      break
    default:
      buttonStyle.backgroundColor = disabled ? '#D0D0D0' : colors.tint
  }

  const btnStyle = {
    ...buttonStyle,
    borderWidth: 1,
    borderColor: disabled ? '#D0D0D0' : colors.tint,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.7 : 1,
    width: '100%',
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    gap: 10,
    flex: 1
  }

  return (
    <TouchableOpacity style={[styles.button, btnStyle, style, styles.disabled]} disabled={disabled} {...props}>
      {children}
    </TouchableOpacity>
  )
}
