import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import imageminWebp from 'imagemin-webp'
import rename from 'gulp-rename'

const {
  src,
  dest
} = gulp

const extname = path => {
  path.extname = '.webp'
}

const imageminPlugins = [
  imageminWebp({
    lossless: false,
    quality: 100
  })
]

export function webp () {
  return src('./src/assets/images/**/*.{jpg,jpeg,png}')
    .pipe(imagemin(imageminPlugins))
    .pipe(rename(extname))
    .pipe(dest('./dist/assets/images'))
}
