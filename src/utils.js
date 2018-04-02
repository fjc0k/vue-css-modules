export function includes(arrayLike, element, fromIndex = 0) {
  for (let i = fromIndex, len = arrayLike.length; i < len; i++) {
    if (arrayLike[i] === element) {
      return true
    }
  }
  return false
}

export function isObject(value) {
  return value !== null && typeof value === 'object'
}

export function isFunction(value) {
  return typeof value === 'function'
}
