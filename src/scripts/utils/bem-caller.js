export function bemCaller (selector, cb) {
  const bemBlockList = document.querySelectorAll(selector)
  const listInstants = [
  ]

  for (const bemBlock of bemBlockList) {
    const buffer = new cb(bemBlock)

    listInstants.push(buffer)
  }

  for (const instants of listInstants) {
    instants.stranger = listInstants
      .filter(inst => inst !== instants)
      .map(inst => inst.methods)
  }

  return {
    listInstants
  }
}
