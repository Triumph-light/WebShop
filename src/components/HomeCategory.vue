<script setup>
import { findBrand } from '@/api/home.js'

import WebShopSkeleton from '@/components/library/Skeleton.vue'

import { computed, defineComponent, reactive, ref } from 'vue'
import { useCategoryStore } from '@/stores'
defineComponent({
  name: 'HomeCategory'
})
const categoryStore = useCategoryStore()

// 获取左侧边栏数据
let brand = reactive({
  id: 'brand',
  name: '品牌',
  children: [{ id: 'brand-children', name: '品牌推荐' }],
  brands: []
})
findBrand().then(data => {
  brand.brands = data.result
})
let menuList = computed(() => {
  let list = categoryStore.list.map(item => {
    return {
      id: item.id,
      name: item.name,
      children: item.children && item.children.slice(0, 2),
      goods: item.goods
    }
  })
  list.push(brand)
  return list
})
console.log(menuList)
// 获取当前左侧边的下表指向
const categoryId = ref(null)
// 渲染当前左侧边弹层
const currCategory = computed(() => {
  return menuList.value.find(item => item.id === categoryId.value)
})
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id" @mouseenter="categoryId = item.id">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${item.id}`">{{
            sub.name
          }}</RouterLink>
        </template>
        <span v-else>
          <WebShopSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          />
          <WebShopSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
        <!-- 弹层 -->
        <div class="layer">
          <h4 v-if="currCategory">
            {{ currCategory.id === 'brand' ? '品牌' : '分类' }}推荐
            <small>根据您的购买或浏览记录推荐</small>
          </h4>
          <ul v-if="currCategory && currCategory.goods && currCategory.goods.length">
            <li v-for="item in currCategory.goods" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">{{ item.name }}</p>
                  <p class="desc ellipsis">{{ item.desc }}</p>
                  <p class="price"><i>¥</i>{{ item.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>

          <ul v-if="currCategory && currCategory.brands && currCategory.brands.length">
            <li class="brand" v-for="item in currCategory.brands" :key="item.id">
              <RouterLink to="/">
                <img :src="item.picture" alt="" /> +
                <div class="info">
                  <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>

                  <p class="name ellipsis">{{ item.name }}</p>

                  <p class="desc ellipsis-2">{{ item.desc }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: $webshopColor;
        .layer {
          display: block;
        }
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;
          small {
            font-size: 16px;
            color: #666;
          }
        }
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            padding: 0;
            width: 300px;
            height: 120px;
            margin-right: 10px;
            margin-bottom: 10px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;
            &:nth-child(3n) {
              margin-right: 0;
            }
            &:hover {
              background: #e3f9f4;
            }
            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              margin-left: 10px;
              img {
                width: 95px;
                height: 95px;
              }
              .info {
                padding-left: 10px;
                line-height: 24px;
                width: 190px;
                .name {
                  font-size: 16px;
                  color: #666;
                }
                .desc {
                  color: #999;
                }
                .price {
                  font-size: 22px;
                  color: $priceColor;
                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
.webshop-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
