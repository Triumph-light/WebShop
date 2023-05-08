<script setup>
import { reactive } from 'vue'

const emits = defineEmits(['sort-change'])
// 实现排序效果，定义排序对象参数
const sortParams = reactive({
  inventory: false,
  onlyDiscount: false,
  // 排序领域
  sortFiled: null,
  // 排序方法
  sortMethod: null
})
const changeSort = sortFiled => {
  // 去除点击重复
  if (sortParams.sortFiled === sortFiled) return
  // 只有价格进行排序，其他正常
  if (sortFiled === 'price') {
    sortParams.sortFiled = sortFiled
    // 第一次默认为降序
    if (sortParams.sortFiled === null) {
      sortParams.sortMethod = 'desc'
    } else {
      sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'desc' : 'asc'
    }
  } else {
    sortParams.sortFiled = sortFiled
    sortParams.sortMethod = null
  }
  emits('sort-change', sortParams)
}
const changeCheck = () => {
  emits('sort-change', sortParams)
}
</script>

<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortFiled === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortFiled === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortFiled === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortFiled === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >评论最多</a
      >
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{ active: sortParams.sortFiled === 'price' && sortParams.sortMethod == 'asc' }"
        />
        <i
          class="arrow down"
          :class="{ active: sortParams.sortFiled === 'price' && sortParams.sortMethod == 'desc' }"
        />
      </a>
    </div>
    <div class="check">
      <WebShopCheckBox v-model="sortParams.inventory" @change="changeCheck"
        >仅显示有货商品</WebShopCheckBox
      >
      <WebShopCheckBox v-model="sortParams.onlyDiscount" @change="changeCheck"
        >仅显示特惠商品</WebShopCheckBox
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: $webshopColor;
        border-color: $webshopColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: $webshopColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: $webshopColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
