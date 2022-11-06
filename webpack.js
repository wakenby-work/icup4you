import babel from './babel.js'

const webpackConfig = (isProd, isDev) => ({
  mode: isProd ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: babel
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js']
  },
  devtool: isDev ? 'source-map' : false,
  target: ['web', 'es6']
})

export default webpackConfig
