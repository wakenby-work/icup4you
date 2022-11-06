import { deleteAsync } from 'del'

export function clean (cb) {
  return deleteAsync('dist').then(() => cb())
}
