import Vue from 'vue'
import CSSModules from '../src'

import renderFn from './renderFn'
import renderFnFunctional from './renderFn-functional'
import templateWithOuterModules from './template-with-outer-modules'
import templateWithInlineModules from './template-with-inline-modules'
import templateWithInlineModulesGlobal from './template-with-inline-modules-global'

Vue.use(CSSModules)

const demos = {
  'renderFn-functional': renderFnFunctional,
  renderFn: renderFn,
  'template-with-inline-modules': templateWithInlineModules,
  'template-with-inline-modules-global': templateWithInlineModulesGlobal,
  'template-with-outer-modules': templateWithOuterModules
}

// eslint-disable-next-line
new Vue({
  el: '#app',
  data: {
    currentDemo: renderFn
  },
  render(h) {
    return (
      h('div', [
        h('div', 'Click button'),
        h('hr'),
        h(this.currentDemo, {
          class: 'custom'
        }),
        h('hr'),
        Object.keys(demos).map(demo => (
          h('button', {
            style: 'margin:10px;font-size:18px;' + (
              this.currentDemo === demos[demo] ? 'border-color:red;' : ''
            ),
            on: {
              click: () => {
                this.currentDemo = demos[demo]
              }
            }
          }, demo)
        )),
        h('hr'),
        h('pre', [JSON.stringify(
          this.currentDemo,
          null,
          2
        )])
      ])
    )
  }
})
