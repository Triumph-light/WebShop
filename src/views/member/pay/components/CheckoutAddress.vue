<script setup>
import { ref, toRef } from 'vue'

import AddressEdit from '@/views/member/pay/components/AddressEdit.vue'
import { useAddressEdit } from '../../../../hook/order'

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['change'])

const list = toRef(props, 'list')
// 显示地址
const showAddress = ref(null)
if (list.value.length) {
  const defaultAddress = list.value.find(item => item.isDefault === 1)
  if (defaultAddress) {
    showAddress.value = defaultAddress
  } else {
    showAddress.value = list.value[0]
  }
}

const dialogVisible = ref(false)
const openDialog = () => {
  dialogVisible.value = true
  selectedAddress.value = null
}
const confirmAddress = () => {
  dialogVisible.value = false
  showAddress.value = selectedAddress.value
  emits('change', showAddress.value.id)
}
const selectedAddress = ref(null)

// 添加收获地址组件
// const addressEditCom = ref(null)
const { addressEditCom, onAddressEdit } = useAddressEdit()
// const openAddressEdit = address => {
//   addressEditCom.value.open(address)
// }
// 成功
const successHandler = formData => {
  console.log('123')
  const editAddress = list.value.find(item => item.id === formData.id)
  if (editAddress) {
    // 修改
    for (const key in editAddress) {
      editAddress[key] = formData[key]
    }
  } else {
    const json = JSON.stringify(formData)
    list.value.unshift(JSON.parse(json))
  }
}
</script>

<template>
  <div class="checkout-address">
    <div class="text">
      <div v-if="!showAddress" class="none">您需要先添加收货地址才可提交订单。</div>
      <ul v-if="showAddress">
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ showAddress.contact }}</li>
        <li>
          <span>收货地址：</span
          >{{ showAddress.fullLocation.replace(/ /g, '') + showAddress.address }}
        </li>
      </ul>
      <a v-if="showAddress" href="javascript:;" @click="onAddressEdit(showAddress)">修改地址</a>
    </div>
    <div class="action">
      <WebShopButton class="btn" type="default" @click="openDialog">切换地址</WebShopButton>
      <WebShopButton class="btn" type="default" @click="onAddressEdit">添加地址</WebShopButton>
    </div>
  </div>
  <Teleport to="#dialog">
    <AddressEdit ref="addressEditCom" @on-success="successHandler"></AddressEdit>
  </Teleport>
  <Teleport to="#dialog">
    <WebShopDialog title="切换收获地址" v-model:visible="dialogVisible">
      <div
        class="text item"
        v-for="item in list"
        :key="item.id"
        :class="{ active: selectedAddress && item.id === selectedAddress.id }"
        @click="selectedAddress = item"
      >
        <ul>
          <li>
            <span>收<i />货<i />人：</span>{{ item.receiver }}
          </li>

          <li><span>联系方式：</span>{{ item.contact }}</li>

          <li><span>收货地址：</span>{{ item.fullLocation.replace(/ /g, '') + item.address }}</li>
        </ul>
      </div>
      <template #footer>
        <WebShopButton @click="confirmAddress()" type="primary">确认</WebShopButton>
      </template>
    </WebShopDialog>
  </Teleport>
</template>

<style lang="scss" scoped>
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: $webshopColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: $webshopColor;
        background: lighten($webshopColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
