<script setup>
import WebShopCarousel from '@/components/library/Carousel.vue'
import { defineComponent, ref } from 'vue'
import { findBanner } from '../api/home'
defineComponent({
  name: 'HomeBanner'
})

let sliders = ref([])
findBanner().then(data => {
  sliders.value = data.result
})
</script>

<template>
  <div class="home-banner">
    <WebShopCarousel :sliders="sliders" :autoPlay="true" />
  </div>
</template>

<style lang="scss" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
</style>
