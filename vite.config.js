import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteCompression from 'vite-plugin-compression'
// 开启Http2.0服务
import basicSsl from '@vitejs/plugin-basic-ssl'
// 开启CDN
import externalGlobals from 'rollup-plugin-external-globals'
import { createHtmlPlugin } from 'vite-plugin-html'

// const externalGlobalsObj = {
//   vue: 'Vue',
//   'vue-demi': 'VueDemi',
//   'vue-router': 'VueRouter',
//   pinia: 'Pinia'
// }

// const cdn = {
//   css: [],
//   js: [
//     'https://unpkg.com/vue@3.2.47/dist/vue.global.js',
//     'https://unpkg.com/vue-demi@0.14.0/lib/index.iife.js',
//     'https://unpkg.com/vue-router@4.1.6/dist/vue-router.global.js',
//     'https://unpkg.com/pinia@2.0.32/dist/pinia.iife.js'
//   ]
// }

// 开启vite提示
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'
  return {
    plugins: [
      vue(),
      vueJsx({}),
      // 配置gzip压缩
      viteCompression({}),
      // 开启http2.0协议
      basicSsl()
      // // 配置CDN
      // {
      //   ...externalGlobals(externalGlobalsObj),
      //   enforce: 'post',
      //   apply: 'build'
      // },
      // createHtmlPlugin({
      //   inject: {
      //     data: {
      //       cdnCss: isProduction ? cdn.css : [],
      //       cdnJs: isProduction ? cdn.js : []
      //     }
      //   }
      // })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      // 自动引入scss全局变量
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";'
        }
      }
    },
    server: {
      host: '127.0.0.1',
      port: 8080,
      https: true
    }
    // build: {
    //   rollupOptions: {
    //     // 去除某些CDN项
    //     external: Object.keys(externalGlobalsObj)
    //   }
    // }
  }
})
