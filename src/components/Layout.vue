<script setup>
// 引入组件
import TopNav from '@/components/TopNav.vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

import { defineComponent } from 'vue'
import { RouterView } from 'vue-router'
import { useCategoryStore } from '@/stores/index.js'
defineComponent({
  name: 'VueLayout'
})

const categoryStore = useCategoryStore()
categoryStore.getList()
</script>

<template>
  <TopNav></TopNav>
  <Header></Header>
  <main class="body">
    <!-- 二级路由 -->
    <RouterView></RouterView>
  </main>
  <Footer></Footer>
</template>

<style lang="scss" scoped>
.body {
  min-height: 600px;
}
</style>
