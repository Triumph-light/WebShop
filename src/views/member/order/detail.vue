<script setup>
import { defineComponent, ref } from 'vue'
import DetailAction from './components/DetailAction.vue'

import { findOrder } from '@/api/member.js'
import { useRoute } from 'vue-router'
import DetailSteps from './components/DetailSteps.vue'
import DetailLogistics from '@/views/member/order/components/DetailLogistics.vue'
import OrderInfo from './components/OrderInfo.vue'

defineComponent({
  name: 'OrderDetail'
})

const route = useRoute()

const order = ref(null)
findOrder(route.params.id).then(data => {
  order.value = data.result
})
</script>

<template>
  <div class="order-detail-page" v-if="order">
    <DetailSteps :order="order"></DetailSteps>
    <DetailAction :order="order"></DetailAction>
    <Suspense v-if="[3, 4, 5].includes(order.orderState)">
      <!-- 组件加载完毕 -->
      <template #default>
        <DetailLogistics :order="order" />
      </template>
      <!-- 组件加载中显示 -->
      <template #fallback>
        <div class="loading">loading</div>
      </template>
    </Suspense>
    <OrderInfo :order="order"></OrderInfo>
  </div>
</template>

<style lang="scss" scoped>
.order-detail-page {
  background: #fff;
}
</style>
