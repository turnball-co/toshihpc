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
      ],
      'react-native-classname-to-style',
      [
        'react-native-platform-specific-extensions',
        {
          extensions: [
            'scss',
            'sass'
          ]
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
          'react-native-classname-to-style',
          [
            'react-native-platform-specific-extensions',
            {
              extensions: [
                'scss',
                'sass'
              ]
            }
          ]
        ]
      }
    ]
  }
}
