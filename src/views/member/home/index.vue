<script setup>
import { defineComponent, ref } from 'vue'

import HomeOverview from './components/HomeOverview.vue'
import HomePanel from './components/HomePanel.vue'
import GoodsRelevant from '@/components/GoodsRelevant.vue'
import GoodsItem from '@/components/GoodsItem.vue'

import { findCollect } from '@/api/index.js'
defineComponent({
  name: 'MemberHome'
})

const goods = {
  id: '1',
  name: '自煮火锅不排队 麦饭石不粘鸳鸯火锅',
  picture: 'https://yanxuan-item.nosdn.127.net/fcdcb840a0f5dd754bb8fd2157579012.jpg',
  desc: '清汤鲜香 红汤劲爽',
  price: '159.00'
}

const collectGoods = ref([])
findCollect({
  page: 1,
  pageSize: 4
}).then(data => {
  collectGoods.value = data.result.items
})
</script>

<template>
  <div class="member-home">
    <!-- 概览 -->
    <HomeOverview />
    <!-- 收藏 -->
    <HomePanel title="我的收藏">
      <GoodsItem v-for="item in collectGoods" :key="item.id" :goods="item"></GoodsItem>
    </HomePanel>
    <!-- 足迹 -->
    <HomePanel title="我的足迹">
      <GoodsItem v-for="i in 4" :key="i" :goods="goods"></GoodsItem>
    </HomePanel>
    <!-- 猜你 -->
    <GoodsRelevant />
  </div>
</template>

<style lang="scss" scoped>
.member-home {
  :deep(.webshop-carousel) {
    .carousel-btn.prev {
      left: 5px;
    }
    .carousel-btn.next {
      right: 5px;
    }
  }
}
</style>
