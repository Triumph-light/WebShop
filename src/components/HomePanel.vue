<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'HomePanel'
})
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ props.title }}<small>{{ props.subTitle }}</small>
        </h3>
        <slot name="right"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
