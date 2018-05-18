<script>
import createElement from '../src/create-element'
import styles from './styles/button.module.css'

// simulate parent to down props
const ctx = {
  props: {
    disabled: false
  }
}

export default {
  name: 'demo-button-2',

  inject: {
    styles: {
      default: () => styles
    }
  },

  functional: true,

  render(h, { parent, injections }) {
    h = createElement(h, 'styles', {
      ...ctx,
      injections
    })

    return h('div', {
      styleName: '@button :disabled mini=disabled',
      on: {
        click: () => {
          // simulate parent to change props
          ctx.props.disabled = !ctx.props.disabled
          parent.$forceUpdate()
        }
      }
    }, 'BUTTON')
  }
}
</script>
