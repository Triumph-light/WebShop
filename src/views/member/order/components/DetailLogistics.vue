<script setup>
import { ref } from 'vue'
import { logisticsOrder } from '../../../../api/member'
import OrderLogistics from './OrderLogistics.vue'
import { useLogisticsOrder } from '../../../../hook/order'

const props = defineProps({
  order: {
    type: Object,
    default: () => {}
  }
})

const logistics = ref(null)
// 模拟加载时间
const $sleep = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
await $sleep()
const data = await logisticsOrder(props.order.id)
logistics.value = data.value

const { logisticsOrderCom, onLogisticsOrder } = useLogisticsOrder()
</script>

<template>
  <div class="detail-logistics" v-if="logistics">
    <p>
      <span>{{ logistics.list[0].WithComponent }}</span>
      <span>{{ logistics.list[0].text }}</span>
    </p>
    <a href="javascript:;" @click="onLogisticsOrder(order)">查看物流</a>
  </div>
  <Teleport to="#dialog">
    <OrderLogistics ref="logisticsOrderCom"></OrderLogistics>
  </Teleport>
</template>

<style lang="scss" scoped>
.detail-logistics {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  background-color: #f5f5f5;
  margin: 30px 50px 0;
  > p {
    flex: 1;
    span {
      color: #999;
      &:first-child {
        margin-right: 30px;
      }
    }
  }
  > a {
    color: $webshopColor;
    text-align: center;
  }
}
</style>
