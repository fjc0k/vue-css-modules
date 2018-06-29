<template>
  <div
    styleName="@button :disabled mini=isMini"
    @click="disabled=!disabled">
    BUTTON
  </div>
</template>

<script>
export default {
  name: 'demo-button-4',

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

<style module>
.button {
  display: inline-block;
  font-size: 18px;
  padding: 10px;
  border: 1px solid green;
}

.disabled {
  opacity: .5;
}

.mini {
  font-size: 12px;
}
</style>
