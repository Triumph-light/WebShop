<script setup>
import { defineComponent, ref, watch } from 'vue'

defineComponent({
  name: 'WebShopCarousel'
})

const props = defineProps({
  sliders: {
    type: Array,
    default: () => []
  },
  duration: {
    type: Number,
    default: 3000
  },
  autoPlay: {
    type: Boolean,
    default: false
  }
})
//
const index = ref(0)
// 开启自动播放
let timer = null
const autoPlay = () => {
  clearInterval(timer)
  timer = setInterval(() => {
    index.value++
    if (index.value >= props.sliders.length) {
      index.value = 0
    }
  }, props.duration)
}
watch(
  () => props.sliders,
  newVal => {
    if (newVal.length && props.autoPlay) {
      index.value = 0
      autoPlay()
    }
  },
  { immediate: true }
)
// 暂停
const stop = () => {
  if (timer) clearInterval(timer)
}
// 开启
const start = () => {
  if (props.sliders.length && props.autoPlay) {
    autoPlay()
  }
}
// 上下张
const toggle = step => {
  const newIndex = index.value + step
  if (newIndex >= props.sliders.length) {
    index.value = 0
    return
  }
  if (newIndex < 0) {
    index.value = props.sliders.length - 1
    return
  }
  index.value = newIndex
}
// 指示器
const toIndicator = indicatorIndex => {
  index.value = indicatorIndex
}
</script>

<template>
  <div class="webshop-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, i) in props.sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <RouterLink v-if="item.hrefUrl" :to="item.hrefUrl">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
        <div v-else class="slider">
          <RouterLink v-for="goods in item" :key="goods.id" :to="`/product/${goods.id}`">
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev" @click="toggle(-1)"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next" @click="toggle(1)"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
        @click="toIndicator(i)"
      ></span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.webshop-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
      // 轮播商品
      .slider {
        display: flex;
        justify-content: space-around;
        padding: 0 40px;
        > a {
          width: 240px;
          text-align: center;
          img {
            padding: 20px;
            width: 230px !important;
            height: 230px !important;
          }
          .name {
            font-size: 16px;
            color: #666;
            padding: 0 40px;
          }
          .price {
            font-size: 16px;
            color: $webshopColor;
            margin-top: 15px;
          }
        }
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
