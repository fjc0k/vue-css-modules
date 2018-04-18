import { includes, camelCase } from './utils'

const cache = Object.create(null)

export default expression => {
  if (cache[expression]) return cache[expression]

  let className
  let binding
  let bindingValue
  let role

  if (includes(expression, '=', 1)) { // eg: disabled=isDisabled
    [className, binding] = expression.split('=')
  } else {
    const modifier = expression[0]
    if (modifier === '$') { // eg: $type
      binding = expression.substr(1)
      bindingValue = true
    } else if (modifier === '@') { // eg: @button
      className = expression.substr(1)
      role = className
    } else if (modifier === ':') { // eg: :disabled
      className = expression.substr(1)
      binding = camelCase(className)
    } else {
      className = expression
    }
  }

  cache[expression] = {
    className,
    binding,
    bindingValue,
    role
  }

  return cache[expression]
}
