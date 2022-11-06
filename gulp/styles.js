import gulp from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import gulpIf from 'gulp-if'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import minmax from 'postcss-media-minmax'
import cssnano from 'cssnano'
import { isDev, isProd } from './util/verno-env.js'
import { vernoPlumber } from './plugins/verno-plumber.js'

const {
  src,
  dest
} = gulp

const sass = gulpSass(dartSass)

const plugins = [
  minmax(),
  isProd() ? autoprefixer() : () => {},
  isProd() ? cssnano() : () => {}
]

export function styles () {
  return src('./src/styles/style.scss')
    .pipe(vernoPlumber())
    .pipe(gulpIf(isDev(), sourcemaps.init()))
    .pipe(sass())
    .pipe(postcss(plugins))
    .pipe(gulpIf(isDev(), sourcemaps.write('.')))
    .pipe(dest('dist/css'))
}
