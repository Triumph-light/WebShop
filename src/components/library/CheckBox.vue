<script setup>
import { useSlots, ref, watch } from 'vue'

const slots = useSlots()
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

// 选中功能
const checked = ref(false)
const changeChecked = () => {
  checked.value = !checked.value
  emit('update:modelValue', checked.value)
}

// 自定义双向绑定功能
watch(
  () => props.modelValue,
  () => {
    checked.value = props.modelValue
  },
  { immediate: true }
)
</script>

<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="slots.default"><slot name="default"></slot></span>
  </div>
</template>

<style lang="scss" scoped>
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $webshopColor;
    ~ span {
      color: $webshopColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
