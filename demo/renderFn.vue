<script>
import CSSModules from '../src'
import styles from './styles/button.module.css'

export default {
  name: 'demo-button-3',

  mixins: [
    CSSModules(styles)
  ],

  data() {
    return {
      disabled: false,
      type: 'danger'
    }
  },

  computed: {
    isMini() {
      return this.disabled
    }
  },

  render(h) {
    return h('div', {
      styleName: ['@button $type :disabled mini=isMini'],
      on: {
        click: () => {
          this.disabled = !this.disabled
          this.type = 'primarydanger'.replace(this.type, '')
        }
      }
    }, 'BUTTON')
  }
}
</script>
