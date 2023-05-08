<script setup>
import {} from 'vue'

const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})
</script>

<template>
  <div class="detail-steps" style="padding: 20px">
    <WebShopSteps :active="props.order.orderState === 6 ? 1 : props.order.orderState">
      <WebShopStepsItem title="提交订单" :desc="props.order.createTime"></WebShopStepsItem>
      <WebShopStepsItem title="付款成功" :desc="props.order.payTime"></WebShopStepsItem>
      <WebShopStepsItem title="商品发货" :desc="props.order.consignTime"></WebShopStepsItem>
      <WebShopStepsItem title="确认收货" :desc="props.order.evaluationTime"></WebShopStepsItem>
      <WebShopStepsItem title="订单完成" :desc="props.order.endTime"></WebShopStepsItem
    ></WebShopSteps>
  </div>
</template>

<style lang="scss" scoped></style>
