function onDelegate (type, childSelector, handler) {
  const isValidType = (
    type === 'reset' ||
    type === 'input' ||
    type === 'submit' ||
    type === 'click'
  )

  if (!isValidType) {
    return console.error('Не валидное значение в событии')
  }

  function delegate (event) {
    const validElement = event.target.closest(childSelector)

    if (validElement) handler.call(validElement, event)
  }

  document.addEventListener(`${type}`, delegate)

  return delegate
}

function offDelegate (type, delegate) {
  document.removeEventListener(`${type}`, delegate)
}

export {
  onDelegate,
  offDelegate
}
