<script setup>
import { defineComponent, ref, onMounted } from 'vue'

// 处理使用render函数时无法使用自定义封装组件
import WebShopButton from './Button.vue'

defineComponent({
  name: 'WebShopConfirm'
})

const props = defineProps({
  title: {
    type: String,
    default: '温馨提示'
  },
  text: {
    type: String,
    default: ''
  },
  submitCallback: {
    type: Function
  },
  cancelCallback: {
    type: Function
  }
})

const fade = ref(false)
onMounted(() => {
  setTimeout(() => {
    fade.value = true
  }, 0)
})
</script>

<template>
  <!-- 遮罩层 -->
  <div class="xtx-confirm" :class="{ fade }">
    <!-- 核心内容 -->
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ props.title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new" @click="cancelCallback"></a>
      </div>
      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ props.text }}</span>
      </div>
      <div class="footer">
        <WebShopButton size="mini" type="gray" @click="props.cancelCallback">取消</WebShopButton>
        <WebShopButton size="mini" type="primary" @click="props.submitCallback">确认</WebShopButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: $priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
