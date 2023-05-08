<script setup>
import { defineComponent, ref } from 'vue'
import { findNew } from '@/api/home.js'
import HomePanel from './HomePanel.vue'
import HomeSkeleton from './HomeSkeleton.vue'
defineComponent({
  name: 'HomeVue'
})
const goods = ref([])
findNew().then(data => {
  goods.value = data.result
})
</script>

<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" subTitle="新鲜出炉 品质靠谱">
      <template #right>
        <WebShopMore path="/"></WebShopMore>
      </template>
      <!-- 面板内容 -->
      <div style="position: relative; height: 406px">
        <transition name="fade">
          <ul class="goods-list" v-if="goods.length">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton v-else></HomeSkeleton>
        </transition>
      </div>
    </HomePanel>
  </div>
</template>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: $priceColor;
    }
  }
}
</style>
