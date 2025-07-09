/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const darkBgColorLight = ' #075031'
const darkBgColorDark = ' #035151'
const lightBgColorLight = ' #075031'
const lightBgColorDark = ' #151718'
const darkTntColorLight = ' #08887d'
const darkTntColorDark = ' #043f1b'
const lightTntColorLight = ' #08887d'
const lightTntColorDark = ' #075031'

export const Colors = {
  light: {
    text: ' #0b778c',
    background: lightBgColorLight,
    tint: lightTntColorLight,
    icon: '#687076',
    tabIconDefault: '#047673',
    tabIconSelected: lightTntColorLight
  },
  dark: {
    text: ' #0b778c',
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
    background: '#0A7EA4',
    text: '#72a6a2',
    border: '#72a6a2'
  },
  secondary: {
    background: '#A4300A',
    text: '#001c1d',
    border: '#001c1d'
  }
}
