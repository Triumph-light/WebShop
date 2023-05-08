<script setup>
import { computed, defineComponent } from 'vue'
import { useCategoryStore } from '@/stores'
defineComponent({
  name: 'AppHeaderNav'
})

const categoryStore = useCategoryStore()
const list = computed(() => {
  return categoryStore.list
})
</script>

<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mouseenter="categoryStore.show(item)"
      @mouseleave="categoryStore.hide(item)"
    >
      <RouterLink :to="`/category/${item.id}`" @click="categoryStore.hide(item)">{{
        item.name
      }}</RouterLink>
      <div :class="`layer ${item.open ? 'open' : ''}`">
        <ul>
          <li v-for="sub in item.children" :key="sub.id" @click="categoryStore.hide(item)">
            <RouterLink :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    cursor: pointer;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: $webshopColor;
        border-bottom: 1px solid $webshopColor;
      }
      > .layer {
        height: 132px;
        opacity: 1;
      }
    }
  }
}
.layer {
  width: 1240px;
  background-color: #fff;
  position: absolute;
  left: -200px;
  top: 56px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 5px #ccc;
  transition: all 0.2s 0.1s;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 70px;
    align-items: center;
    height: 132px;
    li {
      width: 110px;
      text-align: center;
      img {
        width: 60px;
        height: 60px;
      }
      p {
        padding-top: 10px;
      }
      &:hover {
        p {
          color: $webshopColor;
        }
      }
    }
  }
}
</style>
