import gulp from 'gulp'

import { views } from './gulp/views.js'
import { styles } from './gulp/styles.js'
import { scripts } from './gulp/scripts.js'
import { global } from './gulp/global.js'
import { clean } from './gulp/del.js'
import { images } from './gulp/images.js'
import { fonts } from './gulp/fonts.js'
import { videos } from './gulp/videos.js'
import { icons } from './gulp/icons.js'
import { serve } from './gulp/serve.js'
import { webp } from './gulp/webp.js'

const {
  parallel,
  series
} = gulp

const build = series(clean, parallel(
  views, styles, global, images, fonts, videos, icons, scripts, webp
))

const start = series(build, serve)

export {
  build,
  start
}
