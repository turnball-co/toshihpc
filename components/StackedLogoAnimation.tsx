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
    color: Colors.light.text
  },
  logotoshi: {
    fontFamily: 'Zapfino',
    fontSize: 64,
    lineHeight: 72,
  },
  logohpc: {
    fontFamily: 'SpaceMono Regular',
    marginLeft: 36,
    marginTop: -28,
    fontSize: 128,
    fontStyle: 'italic'
  }
})



function ChevronLogo({ keyValue, src, style }: { keyValue: number, src: any, style?: any }) {

  return (
    <MotiImage
      key={keyValue}
      source={src}
      from={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        type: 'spring',
        duration: 1500,
        delay: (keyValue + 1) * 577
      }}
      style={[style, {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 158,
        width: 134,
        zIndex: keyValue + 1
      }]}
    />
  )
}

function collectLogos( colorMode: string ) {
  return {
    images: [
      `../assets/images/logo/${colorMode}-chevron_1.png`,
      `../assets/images/logo/${colorMode}-chevron_2.png`,
      `../assets/images/logo/${colorMode}-chevron_3.png`,
      `../assets/images/logo/${colorMode}-chevron_4.png`,
      `../assets/images/logo/${colorMode}-chevron_5.png`,
      `../assets/images/logo/${colorMode}-chevron_6.png`
    ]
  }
}

export const StackedLogoAnimation = () => {
  const isValid = useSharedValue(true)
  const translateY = useDerivedValue(() => (isValid.value ? 0 : -10))
  const colorScheme = useColorScheme()
  const [dark, toggle] = useReducer((s) => !s, true)
  const colorMode = dark ? 'dark' : 'light'
  const { images } = collectLogos(colorMode)
  const exitAnimate = {
      from: {
        rotate: "0deg"
      },
      animate: {
        rotate: "360deg"
      },
      transition: {
        loop: true,
        repeatReverse: false,
        type: "timing",
        delay: 4500,
        duration: 2500
      }
  }
  
  return (
    <AnimatePresence>
      <MotiView
        style={[styles.container]}>
        {/* @ts-ignore */}
        <MotiView key={'imagesLogo'} style={styles.chevron} {...exitAnimate}>
          {images.map((image, index) => (
            <ChevronLogo
              key={index}
              keyValue={index}
              src={image} 
              style={styles.logoPad} />
          ))}
        </MotiView>
        <MotiText style={{...styles.logoText, ...styles.logotoshi}}>Toshi</MotiText>
        <MotiText style={{...styles.logoText, ...styles.logohpc}}>HPC</MotiText>
      </MotiView>
    </AnimatePresence>
  )
}
