<script setup>
import { defineComponent } from 'vue'

defineComponent({
  name: 'WebShopMore'
})
const props = defineProps({
  path: {
    type: String,
    default: '/'
  }
})
</script>

<template>
  <RouterLink :to="props.path" class="webshop-more">
    <span>查看全部</span>
    <i class="iconfont icon-angle-right"></i>
  </RouterLink>
</template>

<style lang="scss" scoped>
.webshop-more {
  margin-bottom: 2px;
  span {
    font-size: 16px;
    vertical-align: middle;
    margin-right: 4px;
    color: #999;
  }
  i {
    font-size: 14px;
    vertical-align: middle;
    position: relative;
    top: 2px;
    color: #ccc;
  }
  &:hover {
    span,
    i {
      color: $webshopColor;
    }
  }
}
</style>
