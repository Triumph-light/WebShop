<script setup>
import {} from 'vue'

const props = defineProps({
  to: {
    type: [String, Object]
  }
})
</script>

<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="props.to" :to="props.to"><slot></slot></RouterLink>
    <span v-else><slot></slot></span>
  </div>
</template>

<style lang="scss" scoped></style>
