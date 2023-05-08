<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryStore } from '@/stores/index.js'

// 1、获取二级分类id
const route = useRoute()
// 2、获取类目数据
const categoryStore = useCategoryStore()
// 3、通过计算属性得到二级类目的名称和ID，一级类目的名称和ID
const category = computed(() => {
  const obj = {}
  categoryStore.list.forEach(top => {
    top.children &&
      top.children.forEach(sub => {
        if (sub.id === route.params.id) {
          // 设置二级类目和一级类目
          obj.sub = { id: sub.id, name: sub.name }
          obj.top = { id: top.id, name: top.name }
        }
      })
  })
  return obj
})
</script>

<template>
  <WebShopBread>
    <WebShopBreadItem to="/">首页</WebShopBreadItem>
    <WebShopBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</WebShopBreadItem>
    <transition name="fade-right" mode="out-in">
      <WebShopBreadItem v-if="category.sub" :key="category.sub.id">{{
        category.sub.name
      }}</WebShopBreadItem>
    </transition>
  </WebShopBread>
</template>

<style lang="scss" scoped></style>
