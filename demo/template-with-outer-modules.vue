<template>
  <div
    styleName="@button :disabled mini=isMini"
    @click="disabled=!disabled">
    BUTTON
  </div>
</template>

<script>
import CSSModules from '../src'
import styles from './styles/button.module.css'

export default {
  name: 'demo-button-5',

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
  }
}
</script>
