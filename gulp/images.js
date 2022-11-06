import gulp from 'gulp'
import gulpIf from 'gulp-if'
import imagemin, { gifsicle, optipng, mozjpeg, svgo } from 'gulp-imagemin'
import { isProd } from './util/verno-env.js'

const {
  src,
  dest
} = gulp

const imageminPlugins = [
  gifsicle({
    optimisationLevel: 3
  }),
  optipng({
    optimizationLevel: 3
  }),
  mozjpeg({
    progressive: true,
    quality: 100
  }),
  svgo({
    plugins: [
      { removeViewBox: false },
      { removeUnusedNS: false },
      { removeUselessStrokeAndFill: false },
      { cleanupIDs: false },
      { removeComments: true },
      { removeEmptyAttrs: true },
      { removeEmptyText: true },
      { collapseGroups: true }
    ]
  })
]

export function images () {
  return src('./src/assets/images/**/*.{svg,jpg,jpeg,png,gif}')
    .pipe(gulpIf(isProd(), imagemin(imageminPlugins)))
    .pipe(dest('./dist/assets/images'))
}
