import { ref } from 'vue'
// import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'

export const useCancelOrder = () => {
  const orderCancelCom = ref(null)
  const onCancelOrder = item => {
    orderCancelCom.value.open(item)
  }
  return {
    orderCancelCom,
    onCancelOrder
  }
}

export const useLogisticsOrder = () => {
  const logisticsOrderCom = ref(null)
  const onLogisticsOrder = item => {
    logisticsOrderCom.value.open(item)
  }
  return {
    logisticsOrderCom,
    onLogisticsOrder
  }
}

export const useAddressEdit = () => {
  const addressEditCom = ref(null)
  const onAddressEdit = address => {
    console.log(addressEditCom)
    addressEditCom.value.open(address)
  }
  return {
    addressEditCom,
    onAddressEdit
  }
}

/**
 * 支付倒计时函数
 */
export const usePayTime = () => {}
