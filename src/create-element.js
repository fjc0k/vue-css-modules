import { isObject, isFunction } from './utils'
import parseClassExpression from './parse-class-expression'
import { INJECT_ATTR } from './config'

export default function createElement(_) {
  const args = [].slice.call(arguments, 1)

  // for functional component
  if (isFunction(_)) {
    return createElement.bind(_, {
      createElement: _,
      styles: args[0]
    })
  }

  const {
    createElement: h,
    styles = (this && this.$style) || {}
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
      (Array.isArray(modules) ? modules : [modules]).forEach(
        module => {
          if (!module || typeof module !== 'string') return

          module.split(/\s+/g).forEach(
            classExpression => {
              const {
                className,
                binding,
                role
              } = parseClassExpression(classExpression)

              if ((binding ? this[binding] : true) && styles[className]) {
                data.staticClass += ` ${styles[className]}`
                data.staticClass = data.staticClass.trim()
              }

              if (role) {
                data.attrs['data-role'] = role
              }
            }
          )
        }
      )
    }

    // remove styleName attr
    delete data[INJECT_ATTR]
    delete data.attrs[INJECT_ATTR]
  }

  return h.apply(this, args)
}
