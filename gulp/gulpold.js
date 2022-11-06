// Подключение самого gulp
import gulp from 'gulp'
// ---

// Вытаскиваем из gulp нужные методы
const {
    src,
    dest,
    watch,
    series
} = gulp
// ---

// Библиотеки для работы с scss
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'

const sass = gulpSass(dartSass)
// ---

// библиотеки для plumber
import plumber from 'gulp-plumber'
import notifier from 'node-notifier'
import * as path from 'path'
import chalk from 'chalk'
import log from 'fancy-log'
// ---

// Библиотеки для serve
import browser from 'browser-sync'

const browserSync = browser.create()
// ---

// Play sound
// import Afplay from 'afplay'

// Instantiate a new player
// let sadasd = new Afplay()
//
import player from 'play-sound'
const instplayer = player({
    player: 'mplayer'
})

// import { createAudio } from 'node-mp3-player'
// const Audio = createAudio()
// ---

function readyReload (cb) {
    browserSync.reload()
    cb()
}

function styles () {
    return src('./styles/style.scss')
        .pipe(helperPlumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('css'))
}

function serve (cb) {
    browserSync.init({
        server: {
            baseDir: '.',
            serveStaticOptions: {
                extensions: ['html']
            }
        }
    })

    watch(['./styles/**'], series(styles, readyReload))
    watch(['./*.html'], series(readyReload))

    cb()
}

const dev = series(styles, serve)

export {
    styles,
    dev
}

const listMemes = [
    {
        icon: 'memes/chto.jpg',
        sound: './memes/chto.mp3',
        title: 'Что просиходит то блять?',
        message: 'Вы заебали, закрйоте проект'
    },
    {
        icon: 'memes/murzik.jpg',
        sound: 'memes/murzik.mp3',
        title: 'Вы рассторили деда',
        message: 'Он не понимает сколько можно'
    },
    {
        icon: 'memes/nixuya.jpg',
        sound: 'memes/nixuya.mp3',
        title: 'Нихуя себе, вы еблан',
        message: 'Убеать тебе нужно'
    },
    {
        icon: 'memes/skala.jpg',
        sound: 'memes/skala.mp3',
        title: 'Очко будет раскрыто как и глаз',
        message: 'Без вазилина'
    },
    {
        icon: 'memes/stui.jpg',
        sound: 'memes/stui.mp3',
        title: 'Мать чекни?',
        message: 'С такой ошибкой, она уже в канаве'
    }
]
let indexMessage = 0

// import sound from 'sound-play'

// import play from 'play'

// import MPlayer from 'mplayer'
// const playerS = new MPlayer()

// Helper plumber
function helperPlumber () {
    return plumber({
        errorHandler (error) {
            const { name, plugin, message } = error
            const title = `${chalk.red(name)} in ${chalk.cyan(plugin)}`

            log.error(title)
            console.log(chalk.red(message))

            const audio = instplayer.play(listMemes[indexMessage].sound, false)

            notifier.notify({
                ...listMemes[indexMessage],
                sound: false
            }, () => audio.kill())

            indexMessage++
            this.emit('end')
        }
    })
}
// ---
