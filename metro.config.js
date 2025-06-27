const { getDefaultConfig } = require('expo/metro-config')

const config = getDefaultConfig(__dirname)

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'ts', 'tsx'],
  extraNodeModules: {
    'tslib': require.resolve('tslib')
  },
  //  assetExts: [...config.resolver.assetExts, 'css'],
  platforms: ['ios', 'android', 'web'],
  conditions: ['react-native', 'web']
}
config.transformer = {
  ...config.transformer,
  globalObject: 'globalThis',
  unstable_transformProfile: 'hermes-stable'
}

module.exports = config
