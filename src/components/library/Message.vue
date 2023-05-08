<script setup>
import { defineComponent, ref, onMounted } from 'vue'
defineComponent({
  name: 'WebShopMessage'
})

const props = defineProps({
  text: {
    type: String,
    default: ''
  },
  // warn警告，error错误，success成功
  type: {
    type: String,
    default: 'warn'
  }
})

const style = {
  warn: {
    icon: 'icon-warning',
    color: '#e6a23c',
    backgroundColor: 'rgb(253,246,236)',
    borderColor: 'rgb(250,236,216)'
  },
  error: {
    icon: 'icon-shanchu',
    color: '#F56C6C',
    backgroundColor: 'rgb(254, 240, 240)',
    borderColor: 'rgb(253, 226, 226)'
  },
  success: {
    icon: 'icon-queren2',
    color: '#67C23A',
    backgroundColor: 'rgb(240, 249, 235)',
    borderColor: 'rgb(225, 243, 216)'
  }
}

// 定义一个数据控制显示隐藏，默认是隐藏，组件挂载完毕显示
const visible = ref(false)
onMounted(() => {
  visible.value = true
})
</script>

<template>
  <Transition name="down">
    <div class="xtx-message" :style="style[props.type]" v-show="visible">
      <i class="iconfont" :class="style[props.type].icon"></i>
      <span class="text">{{ text }}</span>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.xtx-message {
  width: 300px;
  height: 50px;
  position: fixed;
  z-index: 9999;
  left: 50%;
  margin-left: -150px;
  top: 25px;
  line-height: 50px;
  padding: 0 25px;
  border: 1px solid #e4e4e4;
  background: #f5f5f5;
  color: #999;
  border-radius: 4px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
.down {
  &-enter {
    &-from {
      transform: translate3d(0, -75px, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
</style>
