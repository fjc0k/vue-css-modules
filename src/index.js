import createElement from './create-element'
import { INJECTED } from './config'

export default styles => {
  return {
    beforeCreate() {
      if (this[INJECTED]) return

      this[INJECTED] = true

      this.$createElement = createElement.bind(this, {
        createElement: this.$createElement,
        context: this,
        styles
      })
      this._c = createElement.bind(this, {
        createElement: this._c,
        context: this,
        styles
      })
    }
  }
}
