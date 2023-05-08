<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'WebShopStepsItem'
})

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="xtx-steps-item">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped></style>
