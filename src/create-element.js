/* eslint max-depth: 0 guard-for-in: 0 */
import { isObject, isFunction } from './utils'
import parseClassExpression from './parse-class-expression'
import { INJECT_ATTR } from './config'

export default function createElement(_) {
  const args = [].slice.call(arguments, 1)

  // for functional component
  if (isFunction(_)) {
    return createElement.bind(_, {
      createElement: _,
      styles: args[0],
      context: args[1]
    })
  }

  const {
    createElement: h,
    context = {},
    styles = context.$style || {}
  } = _

  const data = args[1]

  if (isObject(data)) {
    if (!data.staticClass) {
      data.staticClass = ''
    }
    if (!data.attrs) {
      data.attrs = {}
    }

    const modules = data[INJECT_ATTR] || data.attrs[INJECT_ATTR] || ''

    if (modules.length) {
      const _modules = Array.isArray(modules) ? modules : [modules]
      for (let i in _modules) {
        const module = _modules[i]
        if (module && typeof module === 'string') {
          const classExpressions = module.split(/\s+/g)
          for (let i in classExpressions) {
            const classExpression = classExpressions[i]

            let {
              className,
              binding,
              bindingValue,
              role
            } = parseClassExpression(classExpression)

            if (bindingValue) {
              className = context[binding]
              binding = undefined
            }

            if ((binding ? context[binding] : true) && styles[className]) {
              data.staticClass += ` ${styles[className]}`
              data.staticClass = data.staticClass.trim()
            }

            if (role) {
              data.attrs['data-role'] = role
            }
          }
        }
      }
    }

    // remove styleName attr
    delete data[INJECT_ATTR]
    delete data.attrs[INJECT_ATTR]
  }

  return h.apply(null, args)
}
