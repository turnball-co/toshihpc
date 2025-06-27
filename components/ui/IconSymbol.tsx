// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolWeight } from 'expo-symbols'
import * as React from 'react'
import { ComponentProps } from 'react'
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native'

// Add your SFSymbol to MaterialIcons mappings here.
const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'checkmark.circle.fill': 'check-circle',
  'person.fill': 'person',
  'help-circle': 'help-circle'
} as unknown as Partial<
  Record<import('expo-symbols').SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>
>

export type IconSymbolName = keyof typeof MAPPING

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style
}: {
  name: IconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
  weight?: SymbolWeight
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style as StyleProp<TextStyle>} />
}
