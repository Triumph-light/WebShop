<script setup>
import {} from 'vue'

import { orderStatus } from '@/api/constants.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const emits = defineEmits(['on-cancel-order', 'on-delete-order', 'on-logistics-order'])
const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})
// const { start, timeText } = usePayTime()
// start(props.order.countdown)
</script>

<template>
  <div class="order-item">
    <div class="head">
      <span>下单时间：{{ props.order.createTime }}</span>
      <span>订单编号：{{ props.order.id }}</span>
      <!-- 未付款，倒计时时间还有 -->
      <span class="down-time" v-if="props.order.orderState === 1">
        <i class="iconfont icon-down-time"></i>
        <!-- <b>付款截止：{{ props.countdownText }}</b> -->
      </span>
      <!-- 已完成 已取消 -->
      <a
        @click="emits('on-delete-order')"
        v-if="[5, 6].includes(props.order.orederState)"
        href="javascript:;"
        class="del"
        >删除</a
      >
    </div>
    <div class="body">
      <div class="column goods">
        <ul>
          <li v-for="goods in props.order.skus" :key="goods.id">
            <a class="image" href="javascript:;">
              <img :src="goods.image" alt="" />
            </a>
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="attr ellipsis">{{ goods.attrsText }}</p>
            </div>
            <div class="price">¥{{ goods.realPay }}</div>
            <div class="count">x{{ goods.quantity }}</div>
          </li>
        </ul>
      </div>
      <div class="column state">
        <p>{{ orderStatus[order.orderState].label }}</p>
        <!-- 待收货：查看物流 -->
        <!-- 待评价：评价商品 -->
        <!-- 已完成：查看评价 -->
        <p v-if="props.order.orderState === 3">
          <a href="javascript:;" class="green" @click="emits('on-logistics-order')">查看物流</a>
        </p>
        <p v-if="props.order.orderState === 4"><a href="javascript:;" class="green">评价商品</a></p>
        <p v-if="props.order.orderState === 5"><a href="javascript:;" class="green">查看评价</a></p>
      </div>
      <div class="column amount">
        <p class="red">¥{{ props.order.payMoney }}</p>
        <p>（含运费：¥{{ props.order.postFee }}）</p>
        <p>在线支付</p>
      </div>
      <div class="column action">
        <!-- 待支付：立即付款，查看详情，取消订单 -->
        <!-- 待发货：查看详情，再次购买 -->
        <!-- 待收货：确认收货，查看详情，再次购买 -->
        <!-- 待评价：查看详情，再次购买，申请售后 -->
        <!-- 已完成：查看详情，再次购买，申请售后 -->
        <!-- 已取消：查看详情 -->
        <WebShopButton
          @click="router.push(`/member/pay?orderId=${props.order.id}`)"
          v-if="props.order.orderState === 1"
          type="primary"
          size="small"
          >立即付款</WebShopButton
        >
        <WebShopButton v-if="props.order.orderState === 3" type="primary" size="small"
          >确认收货</WebShopButton
        >
        <p>
          <a @click="router.push(`/member/order/${props.order.id}`)" href="javascript:;"
            >查看详情</a
          >
        </p>
        <p @click="emits('on-cancel-order')" v-if="props.order.orderState === 1">
          <a href="javascript:;">取消订单</a>
        </p>
        <p v-if="[2, 3, 4, 5].includes(props.order.orderState)">
          <a href="javascript:;" @click="router.push(`/member/checkout?orderId=${props.order.id}`)"
            >再次购买</a
          >
        </p>
        <p v-if="[4, 5].includes(props.order.orderState)"><a href="javascript:;">申请售后</a></p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: $webshopColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: $priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: $webshopColor;
          }
        }
      }
    }
  }
}
</style>
