import { onDelegate } from '../utils/delegate.js'
import getWidthScrollbar from '../utils/get-width-scrollbar.js'

const $sel = {
  overlay: '.overlay',
  overlayActive: 'overlay--active',
  modalOpen: 'modal--open'
}

const $attr = {
  openModalGetById: 'data-vm-open',
  closeActiveModal: 'data-vm-close'
}

const $state = {
  overlay: getDom($sel.overlay),
  activeModal: false,
  nextModal: false,
  isClosing: false
}

function openModalGetById (id) {
  if ($state.isClosing) return console.warn('Не прошло закрытие предыдущего модального окна!')

  setNextModal(id)
  closeActiveModal()

  openNextModal()
  return updateVars()
}

function setNextModal (id) {
  $state.nextModal = getDom(`#${id}`)
}

function closeActiveModal () {
  if ($state.activeModal) {
    removeClass($state.activeModal, $sel.modalOpen)
    dispatchEventClose($state.activeModal)
  }

  if ($state.activeModal && !$state.nextModal) {
    $state.isClosing = true

    removeClass($state.overlay, $sel.overlayActive)
    transitionend(() => {
      $state.isClosing = false

      showScrollBar()
    })

    return resetVars()
  }
}

function transitionend (cb) {
  $state.activeModal.addEventListener('transitionend', cb, { once: true })
}

function openNextModal () {
  addClass($state.nextModal, $sel.modalOpen)
  dispatchEventOpen($state.nextModal)

  if (!$state.activeModal) {
    addClass($state.overlay, $sel.overlayActive)
    hideScrollbar()
  }
}

function updateVars () {
  const info = {
    activeModal: $state.nextModal,
    prevModal: $state.activeModal
  }

  $state.activeModal = $state.nextModal
  $state.nextModal = false

  return info
}

function resetVars () {
  const activeModal = $state.activeModal

  $state.activeModal = false
  $state.nextModal = false

  return activeModal
}

function getDom (selector) {
  return document.querySelector(selector)
}

function addClass (el, className) {
  el.classList.add(className)
}

function removeClass (el, className) {
  el.classList.remove(className)
}

function hideScrollbar () {
  if (document.body.offsetHeight <= window.innerHeight) return

  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${getWidthScrollbar()}px`

  document.documentElement.style.setProperty('--scrollbar', `${getWidthScrollbar()}px`)
}

function showScrollBar () {
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''

  document.documentElement.style.removeProperty('--scrollbar')
}

function dispatchEventOpen (currentModal) {
  currentModal.dispatchEvent(
    new CustomEvent('vm:open', { bubbles: true })
  )
}

function dispatchEventClose (currentModal) {
  currentModal.dispatchEvent(
    new CustomEvent('vm:close', { bubbles: true })
  )
}

onDelegate('click', `[${$attr.openModalGetById}]`, function (event) {
  const id = this.getAttribute($attr.openModalGetById)

  openModalGetById(id)
})

onDelegate('click', `[${$attr.closeActiveModal}]`, function (event) {
  closeActiveModal()
})

onDelegate('click', $sel.overlay, function (event) {
  closeActiveModal()
})

document.addEventListener('click', event => {
  if (event.target.classList.contains($sel.modalOpen)) closeActiveModal()
})

export {
  openModalGetById,
  closeActiveModal
}

window.vernoOpen = openModalGetById
window.vernoClose = closeActiveModal
