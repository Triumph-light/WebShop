<script setup>
import { defineComponent, toRefs } from 'vue'

defineComponent({
  name: 'GoodsItem'
})

const props = defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
})
const { goods } = toRefs(props)
</script>

<template>
  <RouterLink :to="`/product/${goods.id}`" class="goods-item">
    <img :src="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.tag }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: $webshopColor;
    font-size: 20px;
  }
}
</style>
