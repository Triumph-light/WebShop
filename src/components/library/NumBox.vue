<script setup>
import { ref } from 'vue'

const props = defineProps({
  label: {
    type: String
  },
  modelValue: {
    type: Number,
    default: 1
  },
  min: {
    type: Number,
    default: 1
  },
  max: {
    type: Number,
    default: 100
  }
})
const emits = defineEmits(['change'])
// 自定义双向绑定，推出数据
const num = ref(props.modelValue)
const changeNum = value => {
  const newValue = num.value + value
  if (newValue < props.min) return
  if (newValue > props.max) return
  num.value = newValue
  emits('update:modelValue', newValue)
}
</script>

<template>
  <div class="xtx-numbox">
    <div class="label">{{ props.label }}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="num" />
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
