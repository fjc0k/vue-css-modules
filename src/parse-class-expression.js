import { includes } from './utils'

const cache = Object.create(null)

export default expression => {
  if (cache[expression]) return cache[expression]

  let modifier
  let className
  let binding
  let role

  if (includes(expression, '=', 1)) { // eg: disabled=isDisabled
    modifier = '=';
    [className, binding] = expression.split('=')
  } else {
    const _modifier = expression[0]
    if (_modifier === '@') { // eg: @button
      modifier = _modifier
      className = expression.substr(1)
      role = className
    } else if (_modifier === ':') { // eg: :disabled
      modifier = _modifier
      className = expression.substr(1)
      binding = className
    } else {
      className = expression
    }
  }

  cache[expression] = {
    modifier,
    className,
    binding,
    role
  }

  return cache[expression]
}
