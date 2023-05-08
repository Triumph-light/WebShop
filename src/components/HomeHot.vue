<script setup>
import { defineComponent, ref } from 'vue'
import HomePanel from '@/components/HomePanel.vue'
import HomeSkeleton from '@/components/HomeSkeleton.vue'

import { findHot } from '@/api/home.js'

defineComponent({
  name: 'HomeHot'
})

const goods = ref([])
findHot().then(data => {
  goods.value = data.result
})
</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <transition name="fade">
      <ul class="goods-list" v-if="goods.length">
        <li v-for="item in goods" :key="item.id">
          <Routerlin to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </Routerlin>
        </li>
      </ul>
      <HomeSkeleton v-else bg="#f0f9f4"></HomeSkeleton>
    </transition>
  </HomePanel>
</template>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
