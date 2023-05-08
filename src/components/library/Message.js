// 封装Message工具函数方式
import { createVNode, render } from 'vue'
import WebShopMessage from './Message.vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)

// 定时器
let timer = null

export default ({ type, text }) => {
  // 1、导入组件，根据组件生成虚拟节点
  const vnode = createVNode(WebShopMessage, { type, text })
  // 2、准备一个dom元素，将虚拟节点渲染到dom元素中
  render(vnode, div)
  // 3、开启定时器，移除DOM容器内容
  clearTimeout(timer)
  timer = setTimeout(() => {
    render(null, div)
  }, 3000)
}
