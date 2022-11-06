import gulp from 'gulp'

const {
  src,
  dest
} = gulp

export function global () {
  return src('./src/global/**/*', { dot: true })
    .pipe(dest('dist'))
}
