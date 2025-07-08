import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { AnimatePresence, MotiImage, MotiText, MotiView, View } from 'moti'
import * as React from 'react'
import { useReducer } from 'react'
import { StyleSheet } from 'react-native'
import { useDerivedValue, useSharedValue } from 'react-native-reanimated'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  chevron: {
    position: 'absolute',
    top: -68,
    left: -128,
    width: 134,
    height: 158,
    zIndex: 9
  },
  logoPad: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 10
  },
  logoText: {
    textShadowColor: '#000',
    textShadowOffset: {
      width: 3,
      height: 4
    },
    textShadowRadius: 6,
    shadowOpacity: 0.6,
    color: Colors.light.tabIconSelected
  },
  logotoshi: {
    fontFamily: 'Zapfino',
    fontSize: 64,
    lineHeight: 72,
  },
  logohpc: {
    fontFamily: 'SpaceMono Regular',
    marginLeft: 36,
    marginTop: -36,
    fontSize: 84
  }
})

const LogoCommonProps = {
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

function ChevronLogo({ key, src }: { key: any, src: string }) {
  return (
    <View
      from={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      exitTransition={{
        type: 'timing',
        duration: 2500,
      }}
    >
      <MotiImage
        key={key}
        source={{ uri: src }}
        style={styles.logoPad}
        {...LogoCommonProps}
      />
    </View>
  );
}

function collectLogos( colorMode: string ) {
  return {
    images: [
      '@/assets/images/logo/' + colorMode + '-chevron_1.png',
      '@/assets/images/logo/' + colorMode + '-chevron_2.png',
      '@/assets/images/logo/' + colorMode + '-chevron_3.png',
      '@/assets/images/logo/' + colorMode + '-chevron_4.png',
      '@/assets/images/logo/' + colorMode + '-chevron_5.png',
      '@/assets/images/logo/' + colorMode + '-chevron_6.png'
    ],
    imagesLogo: '@/assets/images/logo/' + colorMode + '-chevron.png'
  }
}

export const StackedLogoAnimation = () => {
  const isValid = useSharedValue(true)
  const translateY = useDerivedValue(() => (isValid.value ? 0 : -10))

  const [dark, toggle] = useReducer((s) => !s, true)
  const colorMode = dark ? 'dark' : 'light'
  const { images, imagesLogo } = collectLogos(colorMode)

  return (
    <AnimatePresence>
      <MotiView
        style={[styles.container]}
        animate={{ backgroundColor: !dark ?  Colors.dark.background : Colors.light.background  }}
        transition={{
          type: 'timing',
          duration: 300,
          translateY: {
            type: 'spring',
            mass: 0.5,
            damping: 10,
            stiffness: 100
          },
        }}>
        <MotiView key={'imagesLogo'} style={styles.chevron}>
          {images.map((image, index) => (
            <ChevronLogo key={index} src={image} />
          ))}
          <MotiImage
            style={styles.logoPad}
            source={{ uri: imagesLogo }}
            {...LogoCommonProps} />
        </MotiView>
        <MotiText style={{...styles.logoText,...styles.logotoshi}}>Toshi</MotiText>
        <MotiText style={{...styles.logoText,...styles.logohpc}}>HPC</MotiText>
      </MotiView>
    </AnimatePresence>
  )
}
