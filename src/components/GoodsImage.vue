<script setup>
import { reactive, ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

const currIndex = ref(0)

// 实现图片放大效果
const target = ref()
const show = ref(false)
const { elementX, elementY, isOutside } = useMouseInElement(target)

const position = reactive({ top: 0, left: 0 })
const bgPosition = reactive({ backgroundPositionX: 0, backgroundPositionY: 0 })
watch([elementX, elementY, isOutside], () => {
  // 限制layer的范围，避免出了父盒子
  if (elementX.value < 100) position.left = 0
  else if (elementX.value > 300) position.left = 200
  else position.left = elementX.value - 100
  if (elementY.value < 100) position.top = 0
  else if (elementY.value > 300) position.top = 200
  else position.top = elementY.value - 100
  // 设置大背景图的定位
  bgPosition.backgroundPositionX = -position.left * 2 + 'px'
  bgPosition.backgroundPositionY = -position.top * 2 + 'px'
  // 设置遮罩容器的定位
  position.left = position.left + 'px'
  position.top = position.top + 'px'
  // 设置是否显示预览大图
  show.value = !isOutside.value
})
</script>

<template>
  <div class="goods-image">
    <div
      class="large"
      v-show="show"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, bgPosition]"
    ></div>
    <div class="middle" ref="target">
      <img :src="props.images[currIndex]" alt="" />
      <div class="layer" v-show="show" :style="position"></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in props.images"
        :key="img"
        :class="{ active: i === currIndex }"
        @mouseenter="currIndex = i"
      >
        <img :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid $webshopColor;
      }
    }
  }
}
</style>
