<script setup>
import { ref, shallowReactive, inject } from 'vue'
import GoodsDetail from '@/components/GoodsDetail.vue'
import GoodsComment from '@/components/GoodsComment.vue'

// tab切换
const activeName = ref('detail')
const changeTabs = name => {
  activeName.value = name
}
const dom = shallowReactive({
  'goods-comment': GoodsComment,
  'goods-detail': GoodsDetail
})

const goods = inject('goods')
</script>

<template>
  <div class="goods-tabs">
    <nav>
      <a
        :class="{ active: activeName === 'detail' }"
        href="javascript:;"
        @click="changeTabs('detail')"
        >商品详情</a
      >
      <a
        :class="{ active: activeName === 'comment' }"
        href="javascript:;"
        @click="changeTabs('comment')"
        >商品评价<span>({{ goods.commentCount }})</span></a
      >
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="dom['goods-' + activeName]"></component>
  </div>
</template>

<style lang="scss" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: '';
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: $webshopColor;
        }
      }
    }
  }
}
</style>
