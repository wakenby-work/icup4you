import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const argv = yargs(hideBin(process.argv)).argv

const isProd = () => !!argv.prod
const isDev = () => !!argv.dev
const isWatch = () => !!argv.watch

export {
  isProd,
  isDev,
  isWatch
}
