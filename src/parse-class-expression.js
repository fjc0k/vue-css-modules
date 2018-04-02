import { includes } from './utils'

const cache = Object.create(null)

const modifiers = ['@', ':']

export default expression => {
  if (cache[expression]) return cache[expression]

  let modifier
  let className
  let binding

  if (includes(expression, '=', 1)) { // eg: disabled=isDisabled
    modifier = '=';
    [className, binding] = expression.split('=')
  } else if (includes(modifiers, expression[0])) { // eg: @button :disabled
    modifier = expression[0]
    className = expression.substr(1)
  } else { // eg: icon
    className = expression
  }

  cache[expression] = {
    modifier,
    className,
    binding,
    role: modifier === '@' && className
  }

  return cache[expression]
}
