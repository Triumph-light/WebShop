<script setup>
import { defineComponent, reactive, ref, watch, getCurrentInstance } from 'vue'
import { orderStatus } from '@/api/constants.js'
import { delteOrder, findOrderList } from '../../../api/member'
import OrderItem from './components/OrderItem.vue'
import OrderCancel from './components/OrderCancel.vue'
import { useCancelOrder, useLogisticsOrder } from '../../../hook/order'
import OrderLogistics from './components/OrderLogistics.vue'
defineComponent({
  name: 'OrderPage'
})

const instance = getCurrentInstance()

const activeName = ref('all')
const clickTab = tab => {
  console.log(tab)
  requstParams.orderState = tab.index
  requstParams.page = 1
}

// 查询订单参数
const requstParams = reactive({
  page: 1,
  pageSize: 5,
  orderState: 0
})
// 订单列表
const orderList = ref([])
const total = ref(0)
// 查询订单
const findOrderListFn = () => {
  loading.value = true
  findOrderList(requstParams).then(data => {
    orderList.value = data.result.items
    total.value = data.result.counts
    loading.value = false
  })
}

const loading = ref(true)
watch(
  requstParams,
  () => {
    findOrderListFn()
  },
  { immediate: true }
)

// 使用hook
const { orderCancelCom, onCancelOrder } = useCancelOrder()

// 删除订单
const onDeleteOrder = item => {
  instance.proxy
    .$confirm({ text: '您确认删除该条订单吗？' })
    .then(() => {
      delteOrder([item.id]).then(() => {
        instance.proxy.$message({ text: '删除订单成功', type: 'success' })
        findOrderListFn()
      })
    })
    .catch(e => {})
}

const { onLogisticsOrder, logisticsOrderCom } = useLogisticsOrder()
</script>

<template>
  <div class="member-order-page">
    <WebShopTabs v-model="activeName" @tab-click="clickTab">
      <WebShopTabsPanel
        v-for="item in orderStatus"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <div class="order-list">
          <div v-if="loading" class="loading"></div>
          <div class="none" v-if="!loading && orderList.length === 0">暂无数据</div>
          <OrderItem
            v-for="item in orderList"
            :key="item.id"
            :order="item"
            @on-cancel-order="onCancelOrder(item)"
            @on-delete-order="onDeleteOrder(item)"
            @on-logistics-order="onLogisticsOrder(item)"
          ></OrderItem>
        </div>
      </WebShopTabsPanel>
    </WebShopTabs>
  </div>
  <Teleport to="#dialog">
    <OrderCancel ref="orderCancelCom"></OrderCancel>
  </Teleport>
  <Teleport to="#dialog">
    <OrderLogistics ref="logisticsOrderCom"></OrderLogistics>
  </Teleport>
</template>

<style lang="scss" scoped>
.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
  min-height: 400px;
}
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
.loading {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/load.jpg) no-repeat center;
  background-size: 40%;
}
.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
}
</style>
