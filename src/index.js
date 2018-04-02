const INJECTED = '__CSSModules__'
const INJECT_ATTR = 'styleName'

const inject = function (h, ...args) {
  const data = args[1]
  if (typeof data === 'object') {
    data.staticClass || (data.staticClass = '')
    const modules = data[INJECT_ATTR] || data.attrs[INJECT_ATTR] || ''
    if (modules.length) {
      (Array.isArray(modules) ? modules : [modules]).forEach(
        module => {
          if (!module || typeof module !== 'string') return
          module.split(/\s+/g).forEach(
            classExpression => {
              const [className, binding] = classExpression.split('=')
              const staticClass = (
                (!binding && className) ||
                (this[binding] && className)
              )
              if (staticClass) {
                data.staticClass += ` ${staticClass}`
                data.staticClass.trim()
              }
            }
          )
        }
      )
    }
  }
  return h.apply(this, args)
}

export default {
  beforeCreate() {
    if (this[INJECTED]) return
    this[INJECTED] = true
    this.$createElement = inject.bind(this, this.$createElement)
  }
}
