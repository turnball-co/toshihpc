/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const darkBgColorLight = ' #ffffff'
const darkBgColorDark = ' #151718'
const lightBgColorLight = ' #ffffff'
const lightBgColorDark = ' #151718'
const darkTntColorLight = ' #08887d'
const darkTntColorDark = ' #ffffff'
const lightTntColorLight = ' #08887d'
const lightTntColorDark = ' #ffffff'

export const Colors = {
  light: {
    text: '#11181C',
    background: lightBgColorLight,
    tint: lightTntColorLight,
    icon: '#687076',
    tabIconDefault: '#047673',
    tabIconSelected: lightTntColorLight
  },
  dark: {
    text: '#ECEDEE',
    background: darkBgColorDark,
    tint: darkTntColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: darkTntColorDark
  },
  swirl: {
    backgroundUrl: '/assets/images/swirl.png'
  },
  primary: {
    // Primary color for the app, buttons, links, etc.
    background: '#0A7EA4',
    text: '#72a6a2',
    border: '#72a6a2'
  },
  secondary: {
    // Secondary color for the app, buttons, links, etc. -- call to actions (CTAs)
    background: '#A4300A',
    text: '#001c1d',
    border: '#001c1d'
  }
}
