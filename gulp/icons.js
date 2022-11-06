import gulp from 'gulp'
import svgSprite from 'gulp-svg-sprite'
import { vernoPlumber } from './plugins/verno-plumber.js'

const {
  src,
  dest
} = gulp

const options = {
  shape: {
    id: {
      separator: '-'
    },
  },
  mode: {
    symbol: {
      sprite: '../icons.svg'
    }
  }
}

function icons () {
  return src('assets/icons/**/*.svg', { cwd: 'src' })
    .pipe(vernoPlumber())
    .pipe(svgSprite(options))
    .pipe(dest('dist/assets/icons'))
}

export {
  icons
}
