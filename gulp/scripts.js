import gulp from 'gulp'
import webpackConfig from '../webpack.js'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import { vernoPlumber } from './plugins/verno-plumber.js'
import { isProd, isDev } from './util/verno-env.js'

const {
  src,
  dest
} = gulp

function scripts () {
  return src('./src/scripts/main.js')
    .pipe(vernoPlumber())
    .pipe(webpackStream(webpackConfig(isProd(), isDev()), webpack))
    .pipe(dest('dist/scripts'))
}

export {
  scripts
}
