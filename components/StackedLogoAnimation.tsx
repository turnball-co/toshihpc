import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { AnimatePresence, MotiImage, MotiText, MotiView } from 'moti'
import * as React from 'react'
import { useReducer, useState, useEffect } from 'react'
import { Easing, StyleSheet, Pressable, Dimensions } from 'react-native'
import { useSharedValue, withTiming, withSequence, withDelay, runOnJS, useAnimatedStyle } from 'react-native-reanimated'
import Animated from 'react-native'
import { router } from 'expo-router'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  chevron: {
    position: 'absolute',
//    top: -48,
    left: -8,
    width: 134,
    height: 158,
    zIndex: 99
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
    fontStyle: 'italic'
  },
  logohpc: {
    fontFamily: 'SpaceMono Regular',
    marginLeft: 36,
    marginTop: -64,
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

function collectLogos(colorMode: string) {
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
  const colorScheme = useColorScheme()
  const [dark, toggle] = useReducer((s) => !s, true)
  const colorMode = dark ? 'dark' : 'light'
  const { images } = collectLogos(colorMode)
  const [animated, setAnimated] = useState(false)
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'circling' | 'dragging' | 'complete'>('idle')

  // Removed unused spinValue and spin animation code

  // Animation values
  const chevronX = useSharedValue(-128)
  const chevronY = useSharedValue(-48)
  const chevronRotation = useSharedValue(0)
  const chevronScale = useSharedValue(1)
  
  const containerScale = useSharedValue(1)
  const containerX = useSharedValue(0)
  const containerY = useSharedValue(0)
  const containerOpacity = useSharedValue(1)

  // Animation sequences
  const startCirclingAnimation = () => {
    'worklet'
    const centerX = 0
    const centerY = 0
    const radius = 200
    
    // Phase 1: Circle around the text (figure-8 pattern)
    chevronX.value = withSequence(
      // Move right and up
      withTiming(centerX + radius, { duration: 800, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }),
      // Circle over the top
      withTiming(centerX - radius, { duration: 1000, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }),
      // Move under and around
      withTiming(centerX + radius, { duration: 1000, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }),
      // Return to start position
      withTiming(-128, { duration: 600, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) })
    )
    
    chevronY.value = withSequence(
      // Move up
      withTiming(centerY - radius, { duration: 800, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }),
      // Stay high while going around
      withTiming(centerY - radius, { duration: 1000, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }),
      // Swoop down under
      withTiming(centerY + radius, { duration: 1000, easing: Easing.bezier(0.25, 0.46, 0.45, 0.94) }),
      // Return to start
      withTiming(-48, { 
        duration: 600, 
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94)
      }, (finished) => {
        if (finished) {
          runOnJS(setAnimationPhase)('dragging')
        }
      })
    )
    
    // Rotate while circling
    chevronRotation.value = withTiming(720, { 
      duration: 3400, 
      easing: Easing.linear 
    })
  }

  const navigateHome = async () => {
    setAnimationPhase('complete')
    console.log('Taking me home...')
    await router.replace('/(tabs)')
  }

  const startDraggingAnimation = () => {
    'worklet'
    // Phase 2: Scale down and move to header position
    const headerY = -screenHeight * 0.4 // Move to top of screen
    const headerScale = 0.3 // Scale down significantly
    
    // Scale everything down
    containerScale.value = withTiming(headerScale, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94)
    })
    
    // Move to header position
    containerY.value = withTiming(headerY, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94)
    })
    
    // Fade out slightly
    containerOpacity.value = withTiming(0.8, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.46, 0.45, 0.94)
    }, (finished) => {
      if (finished) {
        runOnJS(navigateHome)()
      }
    })
  }

  // Start dragging animation when circling is complete
  useEffect(() => {
    if (animationPhase === 'dragging') {
      startDraggingAnimation()
    }
  }, [animationPhase])

  const handlePress = () => {
    if (!animated && animationPhase === 'idle') {
      setAnimated(true)
      setAnimationPhase('circling')
      startCirclingAnimation()
    }
  }

  // Animated styles using Reanimated
  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return {
      from: {
        rotate: '0deg'
      },
      animate: {
        rotate: '360deg'
      },
    transition: {
      toValue: 1,
      delay: 3950,
      duration: 2120,
      loop: true,
      repeatReverse: false,
      type: 'timing',
      easing: Easing.linear,
      onFinish: () => {
        runOnJS(setAnimationPhase)('complete')
      }
    },
      transform: [
        { translateX: chevronX.value },
        { translateY: chevronY.value },
        { rotate: `${chevronRotation.value}deg` },
        { scale: chevronScale.value }
      ]
    }
  })

  const containerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: containerScale.value },
        { translateX: containerX.value },
        { translateY: containerY.value }
      ],
      opacity: containerOpacity.value
    }
  })

  const textGlowAnimation = {
    from: {
      opacity: 0.8
    },
    animate: {
      opacity: animationPhase === 'circling' ? [0.8, 1, 0.8] : 1
    },
    transition: {
      type: 'timing' as const,
      duration: 800,
      loop: animationPhase === 'circling'
    }
  }
  const aniMe = {
    from: {
      rotate: '0deg'
    },
    animate: {
      rotate: '360deg'
    },
    transition: {
      toValue: 1,
      delay: 3950,
      duration: 2120,
      loop: true,
      repeatReverse: false,
      type: 'timing',
      easing: Easing.linear,
      onFinish: () => {
        runOnJS(setAnimationPhase)('complete')
      }
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        opacity: animationPhase === 'complete' ? 0 : 1
      }}>
      <AnimatePresence>
        <MotiView style={[styles.container, containerAnimatedStyle]}>
          <MotiView
            key={'imagesLogo'}
            style={[styles.chevron, chevronAnimatedStyle]}>
            {images.map((image, index) => (
              <ChevronLogo
                key={index}
                keyValue={index}
                src={image} 
                style={styles.logoPad} 
              />
            ))}
          </MotiView>
          <MotiText style={[styles.logoText, styles.logotoshi]} {...textGlowAnimation}>Toshi</MotiText>
          <MotiText style={[styles.logoText, styles.logohpc]} {...textGlowAnimation}>HPC</MotiText>
        </MotiView>
      </AnimatePresence>
    </Pressable>
  )
}
