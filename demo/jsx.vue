<script>
import CSSModules from '../src'
import styles from './styles/button.module.css'

export default {
  name: 'demo-button-1',

  mixins: [
    CSSModules(styles)
  ],

  data() {
    return {
      disabled: false
    }
  },

  computed: {
    isMini() {
      return this.disabled
    }
  },

  render(h) {
    return (
      <div
        styleName="@button :disabled mini=isMini"
        onClick={() => this.disabled = !this.disabled}>
        BUTTON
      </div>
    )
  }
}
</script>
