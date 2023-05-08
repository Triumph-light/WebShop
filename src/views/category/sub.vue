<script setup>
import { defineComponent, ref, watch } from 'vue'
import { findSubCategoryGoods } from '@/api/category.js'
import { useRoute } from 'vue-router'
import SubBread from '@/components/SubBread.vue'
import SubFilter from '@/components/SubFilter.vue'
import SubSort from '@/components/SubSort.vue'
import GoodsItem from '@/components/GoodsItem.vue'
defineComponent({
  name: 'SubCategoryPage'
})

const route = useRoute()
let loading = ref(false)
let finished = ref(false)
const goodsList = ref([])
// 查询参数
let reqParams = {
  page: 1,
  pageSize: 20
}
// 获取货物列表函数
const getData = async () => {
  loading.value = true
  reqParams.categoryId = route.params.id
  const data = await findSubCategoryGoods(reqParams)
  if (data.result.items.length) {
    goodsList.value.push(...data.result.items)
    reqParams.page++
  } else {
    // 加载完毕，无数据加载
    finished.value = false
  }
  // 关闭加载
  loading.value = false
}

// 跳转下一个二级分类重新加载
watch(
  () => route.params.id,
  newVal => {
    if (newVal && route.path === 'category/sub/' + newVal) {
      goodsList.value = []
      reqParams = {
        page: 1,
        pageSize: 20
      }
    }
    finished.value = false
  }
)

// 监听筛选区改变
const changeFilter = filterParams => {
  reqParams = { ...reqParams, filterParams }
  reqParams.page = 1
  goodsList.value = []
  finished.value = false
}

// 监听排序改变
const changeSort = sortParams => {
  reqParams = { ...reqParams, ...sortParams }
  reqParams.page = 1
  goodsList.value = []
  finished.value = false
}
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter @filter-change="changeFilter"></SubFilter>
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="changeSort" />
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodsList" :key="item.id">
            <GoodsItem :goods="item"></GoodsItem>
          </li>
        </ul>
        <!-- 加载 -->
        <WebShopInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        ></WebShopInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
