export const getNotRepeatRandomNumber = (min, max) => {
  let array = []

  const shuffle = (arr) => {
    let j, temp

    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))

      temp = arr[j]
      arr[j] = arr[i]
      arr[i] = temp
    }

    return arr
  }

  const fluidArray = () => {
    for (let index = min; index <= max; index++) {
      array.push(index)
    }

    array = shuffle(array)
  }

  return () => {
    if (array.length === 0) fluidArray()

    return array.shift()
  }
}
