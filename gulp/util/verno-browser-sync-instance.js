import browserSync from 'browser-sync'

const vernoBrowserSyncInstance = browserSync.has('server') ? browserSync.get('server') : browserSync.create('server')

export {
  vernoBrowserSyncInstance
}
