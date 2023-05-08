<script setup>
import { defineComponent, watch, ref, provide, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { findGoods } from '@/api/product.js'
import { useCartStore } from '@/stores/index.js'

import GoodsImage from '@/components/GoodsImage.vue'
import GoodsSales from '@/components/GoodsSales.vue'
import GoodsName from '@/components/GoodsName.vue'
import GoodsSku from '../../components/GoodsSku.vue'
import GoodsRelevant from '@/components/GoodsRelevant.vue'
import GoodsTabs from '../../components/GoodsTabs.vue'
import GoodsHot from '../../components/GoodsHot.vue'
import GoodsWarn from '../../components/GoodsWarn.vue'
defineComponent({
  name: 'GoodPage'
})

const goods = ref(null)
const route = useRoute()

watch(
  () => route.params.id,
  newval => {
    if (newval && `/product/${newval}` === route.path) {
      findGoods(route.params.id).then(data => {
        goods.value = data.result
      })
    }
  },
  { immediate: true }
)

// sku改变的时候触发
const changeSku = sku => {
  if (sku.skuId) {
    goods.value.price = sku.price
    goods.value.oldPrice = sku.oldPrice
    goods.value.inventory = sku.inventory
    currSku.value = sku
  } else {
    currSku.value = null
  }
}

// 定义商品数量
const goodsnum = ref(1)

// 向组件GoodsTab提供数据
provide('goods', goods)

// 加入购物车逻辑
const currSku = ref(null)
const instance = getCurrentInstance()
const cartStore = useCartStore()
const insertCart = () => {
  if (!currSku.value) {
    return instance.proxy.$message({ type: 'error', text: '请选择商品规格' })
  }
  if (goodsnum.value > goods.value.inventory) {
    return instance.proxy.$message({ type: 'error', text: '库存不足' })
  }
  cartStore
    .insertAsyncCart({
      id: goods.value.id,
      skuId: currSku.value.skuId,
      name: goods.value.name,
      picture: goods.value.mainPictures[0],
      price: currSku.value.price,
      nowPrice: currSku.value.price,
      count: goodsnum.value,
      attrsText: currSku.value.specsText,
      selected: true,
      isEffective: true,
      stock: currSku.value.inventory
    })
    .then(() => {
      instance.proxy.$message({ type: 'success', text: '加入购物车成功' })
    })
}
</script>

<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <WebShopBread>
        <WebShopBreadItem to="/">首页</WebShopBreadItem>
        <WebShopBreadItem :to="'/category/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</WebShopBreadItem>
        <WebShopBreadItem :to="'/category/sub/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</WebShopBreadItem>
        <WebShopBreadItem>{{ goods.name }}</WebShopBreadItem>
      </WebShopBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <GoodsName :goods="goods"></GoodsName>
          <GoodsSku :goods="goods" @change="changeSku"></GoodsSku>
          <WebShopNumBox label="数量" v-model="goodsnum" :max="goods.inventory"></WebShopNumBox>
          <WebShopButton type="primary" style="margin-top: 20px" @click="insertCart"
            >加入购物车</WebShopButton
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id"></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs">
            <GoodsTabs></GoodsTabs>
          </div>
          <!-- 注意事项 -->
          <div class="goods-warn">
            <GoodsWarn></GoodsWarn>
          </div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1"></GoodsHot>
          <GoodsHot :goodsId="goods.id" :type="2"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
