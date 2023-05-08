import WebShopConfirm from './Confirm.vue'
import { createVNode, render } from 'vue'

// 创建一个盒子
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

// 函数渲染组件
export default ({ title, text }) => {
  return new Promise((resolve, reject) => {
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }

    const vnode = createVNode(WebShopConfirm, { title, text, submitCallback, cancelCallback })
    console.log(vnode)
    render(vnode, div)
  })
}
