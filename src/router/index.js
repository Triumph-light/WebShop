import { createRouter as createVueRouter, createWebHistory } from 'vue-router'
import { h, resolveComponent } from 'vue'
import { useUserStore } from '@/stores/index.js'

// 动态引入，按需加载
const Layout = () => import('@/components/Layout.vue')
const HomePage = () => import('@/views/home/index.vue')
const TopCategoryPage = () => import('@/views/category/index.vue')
const SubCategoryPage = () => import('@/views/category/sub.vue')
const GoodPage = () => import('@/views/goods/index.vue')
const LoginPage = () => import('@/views/login/index.vue')
const CartPage = () => import('@/views/cart/index.vue')
const MemberHome = () => import('@/views/member/home/index.vue')
const MemberLayout = () => import('@/views/member/Layout.vue')
const MemberOrder = () => import('@/views/member/order/index.vue')
const MemberOrderDetail = () => import('@/views/member/order/detail.vue')
const PayCheckout = () => import('@/views/member/pay/components/Checkout.vue')
const PayIndex = () => import('@/views/member/pay/index.vue')

const routes = [
  {
    path: '/',
    name: 'VueLayout',
    component: Layout,
    children: [
      { path: '/', component: HomePage },
      {
        path: '/category/:id',
        component: TopCategoryPage
      },
      {
        path: '/category/sub/:id',
        component: SubCategoryPage
      },
      {
        path: '/product/:id',
        component: GoodPage
      },
      {
        path: '/cart',
        component: CartPage
      },
      {
        path: '/member/checkout',
        component: PayCheckout
      },
      {
        path: '/member/pay',
        component: PayIndex
      },
      {
        path: '/member',
        component: MemberLayout,
        children: [
          { path: '/member', component: MemberHome },
          {
            path: '/member/order/',
            // vue3.0 需要有嵌套关系才能模糊匹配
            component: { render: () => h(resolveComponent('router-view')) },
            children: [
              { path: '', component: MemberOrder },
              { path: ':id', component: MemberOrderDetail }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: LoginPage
  }
]

const router = createVueRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0, behavior: 'smooth' }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // 用户信息
  const { token } = userStore.user
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  next()
})

export default router

// ssr
// export const createRouter = type => {
//   return createVueRouter({
//     history: type === 'client' ? createWebHistory() : createMemoryHistory(),
//     routes
//   })
// }
