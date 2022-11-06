import playerInitial from 'play-sound'
import plumber from 'gulp-plumber'
import notifier from 'node-notifier'
import chalk from 'chalk'
import log from 'fancy-log'
import { listMessage } from '../util/get-messages.js'
import { getNotRepeatRandomNumber } from '../util/get-not-repeat-random-number.js'

const player = playerInitial({
  player: 'mplayer'
})

const getRandomNumber = getNotRepeatRandomNumber(0, listMessage.length - 1)

function vernoPlumber () {
  return plumber({
    errorHandler (error) {
      const msgInfo = getRandomNumber()

      const { name, plugin, message } = error
      const title = `${chalk.red(name)} in ${chalk.cyan(plugin)}`

      log.error(title)
      console.log(chalk.red(message))

      const audio = player.play(listMessage[msgInfo].sound)

      notifier.notify({
        ...listMessage[msgInfo],
        sound: false
      }, () => audio.kill())

      this.emit('end')
    }
  })
}

export {
  vernoPlumber
}
