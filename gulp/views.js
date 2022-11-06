import gulp from 'gulp'

const {
  src,
  dest
} = gulp

export function views () {
  return src('./src/*.html')
    .pipe(dest('./dist'))
}
