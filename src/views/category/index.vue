<script setup>
import { computed, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { useCategoryStore } from '@/stores/index.js'

import { findTopCategory } from '@/api/category.js'
import { findBanner } from '../../api/home'

import GoodsItems from '@/components/GoodsItem.vue'
defineComponent({
  name: 'TopCateGoryPage'
})

// 轮播图
const sliders = ref([])
findBanner().then(data => {
  sliders.value = data.result
})
const route = useRoute()
const categoryStore = useCategoryStore()
const topCategory = computed(() => {
  let cate = {}
  const item = categoryStore.list.find(item => item.id === route.params.id)
  console.log(item)
  if (item) cate = item
  return cate
})

// 推荐商品
const subList = ref([])
const getSubList = async () => {
  const data = await findTopCategory(route.params.id)
  subList.value = data.result.children
}
watch(
  () => route.params.id,
  newVal => {
    newVal && getSubList()
  },
  { immediate: true }
)
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <WebShopBread>
        <WebShopBreadItem to="/">首页</WebShopBreadItem>
        <transition name="fade-right" mode="out-in">
          <WebShopBreadItem :key="topCategory.id">{{ topCategory.name }}</WebShopBreadItem>
        </transition>
      </WebShopBread>
      <!-- 轮播图 -->
      <WebShopCarousel :sliders="sliders" style="height: 500px"></WebShopCarousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="item in subList" :key="item.id">
        <div class="head">
          <h3>-{{ item.name }}-</h3>
          <p class="tag">{{ item.desc }}</p>
          <WebShopMore></WebShopMore>
        </div>
        <div class="body">
          <GoodsItems v-for="g in item.goods" :key="g.id" :goods="g"></GoodsItems>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $webshopColor;
          }
        }
      }
    }
  }
}
.ref-goods {
  background-color: #fff;
  margin-top: 20px;
  position: relative;
  .head {
    .xtx-more {
      position: absolute;
      top: 20px;
      right: 20px;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
