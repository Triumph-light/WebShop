<script setup>
import { defineComponent, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/index.js'
import { useCartStore } from '../stores'
defineComponent({
  name: 'TopNav'
})
const router = useRouter()

const userStore = useUserStore()
const cartStore = useCartStore()
const profile = computed(() => {
  return userStore.user
})

// 登出
const logout = () => {
  userStore.setUser({})
  // 清空购物车
  cartStore.setCartList([])
  router.push('/login')
}
</script>

<template>
  <nav class="topnav">
    <div class="container">
      <ul>
        <li>
          <a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a>
        </li>
        <template v-if="profile.token">
          <li>
            <RouterLink to="/member"
              ><i class="iconfont icon-user"></i>{{ profile.account }}</RouterLink
            >
          </li>
          <li><a href="javascript:;" @click="logout">退出登录</a></li>
        </template>
        <template v-else>
          <li><RouterLink to="/login">请先登录</RouterLink></li></template
        >
        <li><a href="javascript:;">免费注册</a></li>
        <li><a href="javascript:;">我的订单</a></li>
        <li><a href="javascript:;">会员中心</a></li>
        <li><a href="javascript:;">帮助中心</a></li>
        <li><a href="javascript:;">关于我们</a></li>
        <li>
          <a href="javascript:;"><i class="iconfont icon-phone"></i>手机版</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        border-left: 2px solid #666;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: $webshopColor;
        }
      }
    }
  }
}
</style>
