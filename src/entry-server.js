import { createApp } from './main'
import { createRouter } from './router/index.js'
import { renderToString } from 'vue/server-renderer'

const router = createRouter('server')

export async function render(url) {
  const { app } = createApp()
  app.use(router)
  await router.push(url)
  await router.isReady()
  const html = renderToString(app)
  return html
}
