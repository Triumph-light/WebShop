<script setup>
import HomeCategory from '@/components/HomeCategory.vue'
import HomeBanner from '@/components/HomeBanner.vue'
import HomeNew from '@/components/HomeNew.vue'
import HomeHot from '@/components/HomeHot.vue'
import HomeBrand from '@/components/HomeBrand.vue'
import HomeProduct from '@/components/HomeProduct.vue'
import HomeSpecial from '@/components/HomeSpecial.vue'

import { defineComponent } from 'vue'
defineComponent({
  name: 'HomePage'
})
</script>

<template>
  <div class="webshop-home-page">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
        <!-- 新鲜好物 -->
        <HomeNew />
        <!-- 人气推荐 -->
        <HomeHot></HomeHot>
        <!-- 热门品牌 -->
        <HomeBrand></HomeBrand>
        <!-- 商品区域 -->
        <HomeProduct></HomeProduct>
        <!-- 最新专题 -->
        <HomeSpecial></HomeSpecial>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.webshop-carousel) {
  .carousel-btn.prev {
    left: 270px;
  }
  .carousel-indicator {
    padding-left: 150px;
  }
}
</style>
