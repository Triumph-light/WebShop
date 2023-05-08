<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'HomeSkeleton'
})

const props = defineProps({
  bg: {
    type: String,
    default: '#fff'
  }
})
</script>

<template>
  <div class="home-skeleton">
    <div class="item" v-for="item in 4" :key="item" :style="{ backgroundColor: props.bg }">
      <WebShopSkeleton bg="#e4e4e4" width="306px" height="306px" animated></WebShopSkeleton>
      <WebShopSkeleton bg="#e4e4e4" width="160px" height="24px" animated></WebShopSkeleton>
      <WebShopSkeleton bg="#e4e4e4" width="120px" height="24px" animated></WebShopSkeleton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
  }
}
</style>
