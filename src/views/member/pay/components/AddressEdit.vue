<script setup>
import { ref, getCurrentInstance, reactive, defineComponent } from 'vue'
import { addAddress } from '@/api/order.js'

defineComponent({
  name: 'AddressEdit'
})

const dialogVisible = ref(false)

const emits = defineEmits(['on-success'])
const open = address => {
  // 填充数据
  if (address.id) {
    for (const key in formData) {
      formData[key] = address[key]
    }
  } else {
    for (const key in formData) {
      if (key !== 'isDefault') {
        formData[key] = ''
      }
    }
  }
  dialogVisible.value = true
}
defineExpose({
  open
})

// 表单数据
const formData = reactive({
  id: '',
  receiver: '',
  contact: '',
  provinceCode: '',
  cityCode: '',
  countyCode: '',
  address: '',
  postalCode: '',
  addressTags: '',
  isDefault: 0,
  fullLocation: ''
})

// 选择地区
const changeCty = data => {
  formData.provinceCode = data.provinceCode
  formData.cityCode = data.cityCode
  formData.countyCode = data.countyCode
  formData.fullLocation = data.fullLocation
}

const instance = getCurrentInstance()
const submit = () => {
  emits('on-success', formData)
  if (formData.id) {
    addAddress(formData).then(() => {
      // 修改成功
      instance.proxy.$message({ text: '修改收货地址成功', type: 'success' })
      dialogVisible.value = false
      emits('on-success', formData)
    })
  } else {
    addAddress(formData).then(data => {
      // 添加成功
      instance.proxy.$message({ text: '添加收货地址成功', type: 'success' })
      formData.id = data.result.id
      dialogVisible.value = false
      emits('on-success', formData)
    })
  }
}

const close = () => {
  dialogVisible.value = false
}
</script>

<template>
  <WebShopDialog
    :title="formData.id ? '编辑' : '添加' + '收获地址'"
    v-model:visible="dialogVisible"
  >
    <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="label">收货人：</div>
        <div class="field">
          <input class="input" placeholder="请输入收货人" v-model="formData.receiver" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">手机号：</div>
        <div class="field">
          <input class="input" placeholder="请输入手机号" v-model="formData.contact" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地区：</div>
        <div class="field">
          <WebShopCity
            placeholder="请选择所在地区"
            :fullLocation="formData.fullLocation"
            @change="changeCty"
          />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">详细地址：</div>
        <div class="field">
          <input class="input" placeholder="请输入详细地址" v-model="formData.address" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">邮政编码：</div>
        <div class="field">
          <input class="input" placeholder="请输入邮政编码" v-model="formData.postalCode" />
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地址标签：</div>
        <div class="field">
          <input
            class="input"
            placeholder="请输入地址标签，逗号分隔"
            v-model="formData.addressTags"
          />
        </div>
      </div>
    </div>
    <template #footer>
      <WebShopButton type="gray" style="margin-right: 20px" @click="close">取消</WebShopButton>
      <WebShopButton type="primary" @click="submit">确认</WebShopButton>
    </template>
  </WebShopDialog>
</template>

<style lang="scss" scoped>
.xtx-form {
  padding: 0;
  .xtx-form-item {
    display: flex;
    align-items: center;
    width: 700px;
    margin: 0 auto;
    padding-bottom: 25px;
    .label {
      width: 180px;
      padding-right: 10px;
      text-align: right;
      color: #999;
    }
    .field {
      input {
        border: 1px solid #e4e4e4;
        width: 320px;
        height: 50px;
        line-height: 50px;
        padding: 0 10px;
        &::placeholder {
          color: #ccc;
        }
      }
      .xtx-city {
        width: 320px;
        :deep(.select) {
          height: 50px;
          line-height: 48px;
          display: flex;
          padding: 0 10px;
          justify-content: space-between;
          .placeholder {
            font-size: 14px;
            color: #ccc;
          }
          i {
            color: #ccc;
            font-size: 18px;
          }
          .value {
            font-size: 14px;
          }
        }
        :deep(.option) {
          top: 49px;
        }
      }
    }
  }
}
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
</style>
