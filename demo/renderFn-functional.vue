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

  functional: true,

  render(h, { parent }) {
    h = createElement(h, styles)

    const styleName = [
      '@button',
      ctx.props.disabled && 'disabled mini'
    ]

    return h('div', {
      styleName,
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
