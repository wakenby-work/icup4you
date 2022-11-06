function getPadding (dom) {
  return {
    top: parseInt(getComputedStyle(dom).paddingTop),
    right: parseInt(getComputedStyle(dom).paddingRight),
    bottom: parseInt(getComputedStyle(dom).paddingBottom),
    left: parseInt(getComputedStyle(dom).paddingLeft)
  }
}

export {
  getPadding
}
