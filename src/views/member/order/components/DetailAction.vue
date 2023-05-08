<script setup>
import {} from 'vue'
import { orderStatus } from '@/api/constants.js'
import { useCancelOrder } from '../../../../hook/order'
import OrderCancel from './OrderCancel.vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})

const { onCancelOrder, orderCancelCom } = useCancelOrder()

const router = useRouter()
</script>

<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont" :class="[`icon-order-${orderStatus[order.orderState].name}`]"></span>
      <p>{{ orderStatus[props.order.orderState].label }}</p>
    </div>
    <div class="info">
      <p>订单编号：{{ props.order.id }}</p>
      <p>下单时间：{{ props.order.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="props.order.orderState === 1">
        <WebShopButton
          @click="$router.push('/member/pay?id=' + props.order.id)"
          type="primary"
          size="small"
          >立即付款</WebShopButton
        >
        <WebShopButton type="gray" size="small" @click="onCancelOrder(order)"
          >取消订单</WebShopButton
        >
      </template>
      <!-- 待发货 -->
      <template v-if="props.order.orderState === 2">
        <WebShopButton
          type="primary"
          size="small"
          @click="router.push(`/member/checkout?orderId=${props.order.id}`)"
          >再次购买</WebShopButton
        >
      </template>
      <!-- 待收货 -->
      <template v-if="props.order.orderState === 3">
        <WebShopButton type="primary" size="small">确认收货</WebShopButton>
        <WebShopButton
          type="plain"
          size="small"
          @click="router.push(`/member/checkout?orderId=${props.order.id}`)"
          >再次购买</WebShopButton
        >
      </template>
      <!-- 待评价 -->
      <template v-if="props.order.orderState === 4">
        <WebShopButton
          type="primary"
          size="small"
          @click="router.push(`/member/checkout?orderId=${props.order.id}`)"
          >再次购买</WebShopButton
        >
        <WebShopButton type="plain" size="small">评价商品</WebShopButton>
        <WebShopButton type="gray" size="small">申请售后</WebShopButton>
      </template>
      <!-- 已完成 -->
      <template v-if="props.order.orderState === 5">
        <WebShopButton
          type="primary"
          size="small"
          @click="router.push(`/member/checkout?orderId=${props.order.id}`)"
          >再次购买</WebShopButton
        >
        <WebShopButton type="plain" size="small">查看评价</WebShopButton>
        <WebShopButton type="gray" size="small">申请售后</WebShopButton>
      </template>
      <!-- 已取消 -->
    </div>
  </div>
  <Teleport to="#dialog">
    <OrderCancel ref="orderCancelCom"></OrderCancel>
  </Teleport>
</template>

<style lang="scss" scoped>
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: $webshopColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
