<script setup>
import { defineComponent, ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'

defineComponent({
  name: 'WebShopCity'
})
const emits = defineEmits(['change'])
// 封装获取城市数据
const getCityData = () => {
  return new Promise(resolve => {
    if (window.cityData) {
      // 有缓存
      resolve(window.cityData)
    } else {
      // 无缓存
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then(res => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
const props = defineProps({
  fullLocation: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择配送位置'
  }
})
// 定义选择展开的效果
const active = ref(false)
// 定义加载动效
const loading = ref(false)
// 定义当前城市数据
const cityData = ref([])
// 封装弹窗开启方法
const toggleDialog = () => {
  if (active.value) closeDialog()
  else openDialog()
}
const closeDialog = () => {
  active.value = false
}
const openDialog = () => {
  active.value = true
  loading.value = true
  getCityData().then(data => {
    cityData.value = data
    loading.value = false
  })
  // 清空选择结果
  for (let key in changeResult) {
    changeResult[key] = ''
  }
}
// 点击其他地方隐藏
const target = ref()
onClickOutside(target, () => {
  active.value = false
})
const changeResult = reactive({
  provinceCode: '',
  provinceName: '',
  cityCode: '',
  cityName: '',
  countryCode: '',
  countryName: ''
})
const changeItem = item => {
  // 省份
  if (item.level === 0) {
    changeResult.provinceCode = item.code
    changeResult.provinceName = item.name
  }
  // 市
  if (item.level === 1) {
    changeResult.cityCode = item.code
    changeResult.cityName = item.name
  }
  // 地区
  if (item.level === 2) {
    changeResult.countryCode = item.code
    changeResult.countryName = item.name
    changeResult.fullLocation = `${changeResult.provinceName} ${changeResult.cityName} ${changeResult.countryName}`
    closeDialog()
    emits('change', changeResult)
  }
}
// 获取对应省份城市的对应列表
const currList = computed(() => {
  let currList = cityData.value
  if (changeResult.provinceCode) {
    currList = currList.find(p => p.code === changeResult.provinceCode).areaList
  }
  if (changeResult.cityCode) {
    currList = currList.find(c => c.code === changeResult.cityCode).areaList
  }
  return currList
})
</script>

<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggleDialog" :class="{ active }">
      <span class="placeholder" v-show="!props.fullLocation">{{ props.placeholder }}</span>
      <span class="value" v-show="props.fullLocation">{{ props.fullLocation }}</span>
      <i class="iconfont con-angle-down"></i>
    </div>
    <div class="option" v-show="active">
      <div class="loading" v-if="loading"></div>
      <span
        v-else
        class="ellipsis"
        v-for="item in currList"
        :key="item.code"
        @click="changeItem(item)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background-color: #fff;
    }
    .placeholder {
      color: #999;
      font-size: 12px;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5pxs;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background-color: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
}
</style>
