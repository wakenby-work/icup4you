import { bemCaller } from '../utils/bem-caller.js'
import { getPadding } from '../utils/get-padding.js'

bemCaller('[data-va]', function (block) {
  const ident = block.getAttribute('data-va')
  const clicked = block.querySelector('[data-va-clicked]')
  const body = block.querySelector('[data-va-body]')

  body.addEventListener('transitionend', ({ propertyName }) => {
    if (propertyName !== 'height') return
    if (!isOpen()) return

    body.style.height = 'auto'
  })

  const open = () => {
    block.classList.add('_va-open')
    body.style.height = `${body.scrollHeight}px`
  }

  const close = () => {
    setHeight()
    body.style.height = '0'

    block.classList.remove('_va-open')
  }

  const isOpen = () => {
    return block.classList.contains('_va-open')
  }

  const closeAll = () => {
    this.stranger.forEach(methods => {
      if (methods.ident === ident) methods.close()
    })
  }

  const setHeight = () => {
    const height = body.offsetHeight
    const offset = getPadding(body).top + getPadding(body).bottom
    const outHeight = height - offset

    body.style.height = `${outHeight}px`

    getComputedStyle(body).height
  }

  clicked.addEventListener('click', event => {
    closeAll()

    if (isOpen()) close()
    else open()
  })

  this.methods = {
    close,
    ident
  }
})
