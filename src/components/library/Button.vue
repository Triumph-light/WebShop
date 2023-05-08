<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'WebShopButton'
})

const props = defineProps({
  size: {
    type: String,
    default: 'middle'
  },
  type: {
    type: String,
    default: 'dafault'
  }
})
</script>

<template>
  <button class="xtx-button ellipsis" :class="[props.size, props.type]">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.xtx-button {
  appearance: none;
  border: none;
  outline: none;
  background: #fff;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
}
.large {
  width: 240px;
  height: 50px;
  font-size: 16px;
}
.middle {
  width: 180px;
  height: 50px;
  font-size: 16px;
}
.small {
  width: 100px;
  height: 32px;
  font-size: 14px;
}
.mini {
  width: 60px;
  height: 32px;
  font-size: 14px;
}
.default {
  border-color: #e4e4e4;
  color: #666;
}
.primary {
  border-color: $webshopColor;
  background: $webshopColor;
  color: #fff;
}
.plain {
  border-color: $webshopColor;
  color: $webshopColor;
  background: lighten($webshopColor, 50%);
}
.gray {
  border-color: #ccc;
  background: #ccc;
  color: #fff;
}
</style>
