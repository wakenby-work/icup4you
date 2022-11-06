import glob from 'glob'
import path from "path";
import { readFileSync } from 'fs'

function getObjectMessage () {
  return glob.sync('*', { cwd: 'gulp/messages' })
}

export const listMessage = getObjectMessage().map(message =>  {
  const pathCross = path.join(process.cwd(), 'gulp', 'messages', message)

  const getJson = () => JSON.parse(
    String(
      readFileSync(path.join(pathCross, 'index.json'))
    )
  )

  return {
    sound: path.join(pathCross, 'index.mp3'),
    icon: path.join(pathCross, 'index.jpg'),
    ...getJson()
  }
})
