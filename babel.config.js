module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      'babel-preset-expo'
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.js',
            '.android.js',
            '.js',
            '.ts',
            '.tsx',
            '.json',
            '.css'
          ],
          alias: {
            '@': '.'
          }
        }
      ]
    ],
    ignore: [
      'node_modules/(?!(expo.*|@expo.*|react-native.*|@react-native.*|@react-navigation.*)/.*)'
    ],
    overrides: [
      {
        test: [
          './app/**/*.{js,jsx,ts,tsx}',
          './node_modules/expo-*/**/*.{js,jsx}'
        ],
        presets: [
          'babel-preset-expo'
            ],
        plugins: [
        ]
      }
    ]
  }
}
