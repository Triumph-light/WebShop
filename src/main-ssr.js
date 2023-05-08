import { createSSRApp } from 'vue'
// import {  createApp} from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

import ui from '@/components/library/index.js'

// // 引入重置样式代码
import 'normalize.css'
import '@/assets/styles/common.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.use(ui)
  return { app }
}

// createApp(App).use(createPinia()).use(router).use(ui).mount('#app')
