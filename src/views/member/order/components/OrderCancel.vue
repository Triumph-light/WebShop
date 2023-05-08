<script setup>
import { ref, getCurrentInstance } from 'vue'
import { cancelReason } from '@/api/constants.js'
import { cancelOrder } from '@/api/member.js'
import OrderItem from './OrderItem.vue'

// 组件实例
const instance = getCurrentInstance()
// 取消原因
const curText = ref(cancelReason[0])

// dialog的显示与隐藏
const visibleDialog = ref(false)
const order = ref(null)
const open = item => {
  visibleDialog.value = true
  // 记录订单id
  OrderItem.value = item
  // 清空之前选中原因
  curText.value = ''
}
const submit = () => {
  if (!curText.value) {
    return instance.proxy.$message({ text: '请选择取消订单的原因' })
  }
  cancelOrder(order.value.id, curText.value).then(() => {
    instance.proxy.$message({ text: '取消订单成功', type: 'success' })
    // 更新订单状态
    order.value.orderState = 6
    // 关闭对话框
    visibleDialog.value = false
  })
}
</script>

<template>
  <WebShopDialog title="取消订单" v-model:visible="visibleDialog">
    <!-- 组件内容 -->
    <div class="cancel-info">
      <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
      <p class="tip">请选择取消订单的原因（必选）：</p>
      <div class="btn">
        <a
          @click="curText = item"
          v-for="item in cancelReason"
          :key="item"
          href="javascript:;"
          :class="{ active: curText === item }"
        >
          {{ item }}
        </a>
      </div>
    </div>
    <!-- 按钮操作 -->
    <template #footer>
      <WebShopButton type="gray" @click="visibleDialog = false" style="margin-right: 20px"
        >取消</WebShopButton
      >
      <WebShopButton type="primary" @click="submit">确认</WebShopButton>
    </template>
  </WebShopDialog>
</template>

<style lang="scss" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 620px;
  }
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 256px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: $webshopColor;
      }
    }
  }
}
</style>
