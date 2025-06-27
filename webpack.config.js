module.exports = {
  module: {
      alias: {
        tslib: 'tslib/tslib.es6.js',
    },
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          use: ['babel-loader', 'astroturf/loader']        }
      }
    ]
  }
}