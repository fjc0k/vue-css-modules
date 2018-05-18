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

export function isString(value) {
  return typeof value === 'string'
}

const camelCaseCache = Object.create(null)
export function camelCase(value) {
  if (camelCaseCache[value]) return camelCaseCache[value]
  let result = ''
  let shouldUpperCase = false
  for (let i = 0, len = value.length; i < len; i++) {
    const char = value[i]
    if (char === '-') {
      shouldUpperCase = true
    } else {
      result += (result && shouldUpperCase) ? char.toUpperCase() : char
      shouldUpperCase = false
    }
  }
  camelCaseCache[value] = result
  return result
}

const dashCaseCache = Object.create(null)
export function dashCase(value) {
  if (dashCaseCache[value]) return dashCaseCache[value]
  let result = ''
  let shouldAddDash = false
  for (let i = value.length - 1; i >= 0; i--) {
    const char = value[i]
    const charCode = char.charCodeAt(0)
    if (charCode >= 65 && charCode <= 90) {
      shouldAddDash = true
      result = char.toLowerCase() + result
    } else {
      result = char + (shouldAddDash ? '-' : '') + result
      shouldAddDash = false
    }
  }
  dashCaseCache[value] = result
  return result
}
