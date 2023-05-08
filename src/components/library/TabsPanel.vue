<script setup>
import { inject } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  }
})

const activeName = inject('activeName')
</script>

<template>
  <div class="xtx-tabs-panel" v-show="activeName === name">
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
