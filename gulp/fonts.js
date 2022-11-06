import gulp from 'gulp'

const {
  src, dest
} = gulp

function fonts () {
  return src('assets/fonts/**/*', { cwd: 'src' })
    .pipe(dest('dist/assets/fonts'))
}

export {
  fonts
}
