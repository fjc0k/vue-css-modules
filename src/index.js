/* eslint camelcase: 0 */
import createElement from './create-element'

const CSSModules = styles => ({
  beforeCreate() {
    this.original$createElement = this.original$createElement || this.$createElement
    this.original_c = this.original_c || this._c
    this.$createElement = createElement.bind(this, {
      createElement: this.original$createElement,
      context: this,
      styles
    })
    this._c = createElement.bind(this, {
      createElement: this.original_c,
      context: this,
      styles
    })
  }
})

CSSModules.install = Vue => {
  Vue.mixin(CSSModules())
}

export default CSSModules
