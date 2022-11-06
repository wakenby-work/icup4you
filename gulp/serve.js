import gulp from 'gulp'
import { vernoBrowserSyncInstance as browserSync } from './util/verno-browser-sync-instance.js'

import { global } from './global.js'
import { styles } from './styles.js'
import { icons } from './icons.js'
import { fonts } from './fonts.js'
import { images } from './images.js'
import { scripts } from './scripts.js'
import { videos } from './videos.js'
import { views } from './views.js'

const {
  watch,
  series
} = gulp

function readyReload (cb) {
  browserSync.reload()
  cb()
}

function serve (cb) {
  browserSync.init({
    server: {
      baseDir: './dist',
      serveStaticOptions: {
        extensions: ['html']
      }
    }
  })

  watch(['src/styles/**/*.scss'], series(styles, readyReload))
  watch(['src/scripts/**/*.js'], series(scripts, readyReload))

  watch(['src/*.html'], series(views, readyReload))

  watch(['src/assets/images/**/*.{jpg,jpeg,png,svg,gif}'], series(images, readyReload))

  watch(['src/assets/videos/**/*.{mp4,webm}'], series(videos, readyReload))

  watch(['src/assets/fonts/**/*'], series(fonts, readyReload))
  watch(['src/assets/icons/**/*'], series(icons, readyReload))

  watch(['src/global/**/*'], series(global, readyReload))

  cb()
}

export {
  serve
}
