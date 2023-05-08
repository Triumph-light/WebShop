import { createApp } from './main'
import { createRouter } from './router/index.js'

const router = await createRouter('client')

const { app } = createApp()

app.use(router)

router.isReady().then(() => {
  app.mount('#app', true)
})
