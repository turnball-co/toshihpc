import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { MotiView } from 'moti'
import * as React from 'react'
import { useReducer } from 'react'
import { StyleSheet } from 'react-native'
import { Skeleton } from 'moti/skeleton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  chevron: {
    width: 134,
    height: 158,
    position: 'absolute',
    top: 0,
    right: 0
  },
  logoPad: {
    width: 134,
    height: 158,
    position: 'relative'
  }
})

const SkeletonCommonProps = {
  transition: {
    type: 'timing',
    duration: 1000
  },
  position: 'absolute',
  top: 0,
  right: 0,
  radius: 'round',
  height: 158,
  width: 134
} as const

export const StackedLogoAnimation = () => {
  const [dark, toggle] = useReducer((s) => !s, true)
  const colorMode = dark ? 'dark' : 'light'
  const colorScheme = useColorScheme() ?? 'light'
  const images = [
    '@/assets/images/logo/' + colorScheme + '-chevron_1.png',
    '@/assets/images/logo/' + colorScheme + '-chevron_2.png',
    '@/assets/images/logo/' + colorScheme + '-chevron_3.png',
    '@/assets/images/logo/' + colorScheme + '-chevron_4.png',
    '@/assets/images/logo/' + colorScheme + '-chevron_5.png',
    '@/assets/images/logo/' + colorScheme + '-chevron_6.png'
  ]
  return (
    <MotiView
      transition={{
        type: 'timing'
      }}
      style={[styles.container, styles.logoPad]}
      animate={{ backgroundColor: dark ? '#000000' : '#ffffff' }}
    >
      <Skeleton.Group show={true}>
        {images.map((image, index) => (
          <Skeleton key={index} colorMode={colorMode} {...SkeletonCommonProps} />
        ))}
      </Skeleton.Group>
    </MotiView>
  )
}
