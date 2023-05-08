// import WebShopSkeleton from './Skeleton.vue'
// import WebShopCarousel from './Carousel.vue'
// import WebShopMore from './More.vue'
// import WebShopBread from './Bread.vue'
// import WebShopBreadItem from './BreadItem.vue'
import { defineAsyncComponent } from 'vue'
// 函数式使用Message
import Message from './Message.js'
import Confirm from './Confirm.js'

import defaultImg from '@/assets/images/load.jpg'

const components = import.meta.glob('../library/*.vue')

export default {
  install(app) {
    // app.component('WebShopSkeleton', WebShopSkeleton)
    // app.component('WebShopCarousel', WebShopCarousel)
    // app.component('WebShopMore', WebShopMore)
    // app.component('WebShopBread', WebShopBread)
    // app.component('WebShopBreadItem', WebShopBreadItem)

    // 批量注册全局组件
    for (const [key, value] of Object.entries(components)) {
      let preName = 'WebShop'
      const name = preName + key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'))
      app.component(name, defineAsyncComponent(value))
    }
    // 图片懒加载指令
    app.directive('lazyload', {
      mounted(el, binding) {
        const observer = new IntersectionObserver(
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              observer.unobserve(el)
              el.onerror = () => {
                el.src = defaultImg
              }
              el.src = binding.value
              console.log(el)
            }
          },
          {
            threshold: 0.01
          }
        )
        observer.observe(el)
      }
    })

    // vue2.0的写法挂载全局属性，通过组件实例调用属性，vue3不存在
    app.config.globalProperties.$message = Message
    app.config.globalProperties.$confirm = Confirm
  }
}
