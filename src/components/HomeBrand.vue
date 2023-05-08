<script setup>
import HomePanel from '@/components/HomePanel.vue'
import { defineComponent, ref } from 'vue'
import { findBrand } from '@/api/home.js'
defineComponent({
  name: 'HomeBrand'
})
const brands = ref([])
findBrand().then(data => {
  brands.value = data.result
})

// 切换效果
const index = ref(0)
const toggle = step => {
  let newval = index.value + step
  if (newval < 0 || newval > 1) return
  index.value = newval
}
</script>

<template>
  <HomePanel title="热门品牌" subTitle="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        :class="{ disabled: index === 0 }"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        :class="{ disabled: index === 1 }"
        href="javascript:;"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box" ref="box">
      <transition name="fade">
        <ul
          class="list"
          v-if="brands.length"
          :style="{ transform: `translateX(${-index * 1240}px)` }"
        >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div class="skeleton" v-else>
          <WebShopSkeleton
            class="item"
            v-for="i in 5"
            :key="i"
            animated
            bg="#e4e4e4"
            width="240px"
            height="305px"
          ></WebShopSkeleton>
        </div>
      </transition>
    </div>
  </HomePanel>
</template>

<style lang="scss" scoped>
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: $webshopColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
