import gulp from 'gulp'

const {
  src,
  dest
} = gulp

export function videos () {
  return src('./src/assets/videos/**/*')
    .pipe(dest('./dist/assets/videos'))
}
