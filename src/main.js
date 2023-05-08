import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import App from './App.vue'
import ui from '@/components/library/index.js'

// // 引入重置样式代码
import 'normalize.css'
import '@/assets/styles/common.scss'
// 引入字体图标
import '@/assets/iconfont/iconfont.css'
// 引入mock
import './mock'

const app = createApp(App)

app.use(router).use(createPinia()).use(ui).mount('#app')
