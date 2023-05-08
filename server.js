/* eslint-disable no-undef */
// 做SSR渲染的服务器
const fs = require('fs')
const path = require('path')
const express = require('express')
const { createServer: createViteServer } = require('vite')
// const fileURLToPath = require('url')

// const __dirname = fileURLToPath(import.meta.url)

async function createServer() {
  const app = express()

  // 创建vite应用，禁止自身html服务逻辑
  const vite = await createViteServer({
    server: {
      middlewareMode: true
    },
    appType: 'custom'
  })
  // 使用connect中间件作为实例
  app.use(vite.middlewares)

  // 处理服务端返回内容
  app.use('*', async (req, res) => {
    const url = req.originalUrl

    try {
      // 1、读index.html文件
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
      // 2、应用vite html转换，注入热模更新
      template = await vite.transformIndexHtml(url, template)
      console.log(template)
      // 3、加载服务器入口,vite.ssrLoadModule自动编译文件
      const { render } = await vite.ssrLoadModule('/src/entry-server.js')
      // 4、渲染应用HTML
      const appHtml = await render(url)
      // 5、替换占位符，注入html
      const html = template.replace(`<!-- app-html -->`, appHtml)
      // 6、返回html
      res.status(200).set({ 'content-type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  app.listen(8080, () => console.log('run at http://127.0.0.1:3000'))
}

createServer()
