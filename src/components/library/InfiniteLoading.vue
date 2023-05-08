<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['infinite'])
const container = ref(null)
useIntersectionObserver(
  container,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      if (props.loading === false && props.finished === false) {
        emits('infinite')
      }
    }
  },
  {
    threshold: 0
  }
)
</script>

<template>
  <div class="xtx-infinite-loading" ref="container">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="loading" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.xtx-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
