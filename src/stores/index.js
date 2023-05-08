import { defineStore } from 'pinia'
import { findAllCategory, topCategory } from '../api/constants'
import {
  checkAllCart,
  deleteCart,
  findCartList,
  getNewCartGoods,
  insertCart,
  mergeLocalCart,
  updateCart
} from '../api/cart'

// 用户数据全局存储
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: {
        id: '',
        account: '',
        nickname: '',
        avatar: '',
        token: '',
        mobile: ''
      }
    }
  },
  actions: {
    setUser(user) {
      for (let key in this.user) {
        this.user[key] = user[key]
      }
    }
  }
})

// 分类数据全局存储
export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      // 对list进行初始化，防止白屏没有数据
      list: topCategory.map(item => {
        return {
          name: item
        }
      })
    }
  },
  actions: {
    async getList() {
      const { result } = await findAllCategory()
      result.forEach(item => {
        item.open = false
      })
      this.list = result
    },
    show(item) {
      const category = this.list.find(category => category.id === item.id)
      category.open = true
      console.log(item.id, '打开')
    },
    hide(item) {
      const category = this.list.find(category => category.id === item.id)
      category.open = false
      console.log(item.id, '离开')
    }
  }
})

// 购物车全局存储
export const useCartStore = defineStore('cart', {
  state: () => {
    return {
      list: []
    }
  },
  getters: {
    // 有效商品列表
    validList() {
      return this.list.filter(item => item.stock > 0 && item.isEffective)
    },
    // 有效商品件数
    validTotal() {
      return this.validList.reduce((p, c) => p + c.count, 0)
    },
    // 有效商品总金额
    validAmount() {
      return this.validList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList() {
      return this.list.filter(item => !(item.stock > 0 && item.isEffective))
    },
    // 选中商品列表
    selectedList() {
      return this.validList.filter(item => item.selected)
    },
    // 选中商品件数
    selectedTotal() {
      return this.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 选中商品总金额
    selectedAmount() {
      return this.selectedList.reduce((p, c) => p + c.nowPrice * 100 * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll() {
      return this.validList.length === this.selectedList.length && this.selectedList.length !== 0
    }
  },
  actions: {
    // 添加到购物车
    insertCart(goods) {
      const sameIndex = this.list.findIndex(item => item.skuId === goods.skuId)
      // 购物车存在这个商品累加
      if (sameIndex >= 0) {
        goods.count = this.list[sameIndex].count + goods.count
        this.list.splice(sameIndex, 1)
      }
      this.list.unshift(goods)
    },
    insertAsyncCart(goods) {
      // 做异步处理，因为要发起请求
      return new Promise((resolve, reject) => {
        const userStore = useUserStore()
        if (userStore.user.token) {
          // 已经登录，调用api成功本地修改
          insertCart(goods)
            .then(() => {
              return findCartList()
            })
            .then(data => {
              this.setCartList(data.result)
              resolve()
            })
        } else {
          // 没有登录，本地存储
          this.insertCart(goods)
          resolve()
        }
      })
    },
    // 修改购物车商品
    updateCart(goods) {
      const updateGoods = this.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== null && goods[key] !== undefined && goods[key] !== '') {
          updateGoods[key] = goods[key]
        }
      }
    },
    updateAsyncCart(goods) {
      const userStore = useUserStore()
      return new Promise((resolve, reject) => {
        if (userStore.user.token) {
          // 登录
          updateCart(goods)
            .then(() => {
              return findCartList()
            })
            .then(data => {
              this.setCartList(data.result)
              resolve()
            })
        } else {
          // 本地
          this.updateCart(goods)
          resolve()
        }
      })
    },
    deleteCart(skuId) {
      const index = this.list.findIndex(item => item.skuId === skuId)
      this.list.splice(index, 1)
    },
    deleteAysncCart(skuId) {
      const userStore = useUserStore()
      return new Promise((resolve, reject) => {
        if (userStore.user.token) {
          // 登录
          deleteCart([skuId])
            .then(() => {
              return findCartList()
            })
            .then(data => {
              this.setCartList(data.result)
              resolve()
            })
        } else {
          // 本地
          this.deleteCart(skuId)
          resolve()
        }
      })
    },
    findCartList() {
      return new Promise((resolve, reject) => {
        const userStore = useUserStore()
        if (userStore.user.token) {
          // 登录
          findCartList().then(data => {
            this.setCartList(data.result)
            resolve()
          })
        } else {
          // 本地
          const promiseArr = this.list.map(item => {
            return getNewCartGoods(item.skuId)
          })
          console.log(promiseArr)
          Promise.all(promiseArr)
            .then(dataArr => {
              dataArr.forEach((data, i) => {
                this.updateCart({ skuId: this.list[i].skuId, ...data.result })
              })
              resolve()
            })
            .catch(e => {
              reject(e)
            })
        }
      })
    },
    checkAsyncALlCart(selected) {
      const userStore = useUserStore()
      return new Promise((resolve, reject) => {
        if (userStore.user.token) {
          // 登录
          const ids = this.validList.map(item => item.skuId)
          checkAllCart({ selected, ids })
            .then(() => {
              return findCartList()
            })
            .then(data => {
              this.setCartList(data.result)
              resolve()
            })
        } else {
          this.validList.forEach(item => {
            this.updateCart({ skuId: item.skuId, selected })
          })
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart(isClear) {
      const userStore = useCartStore()
      return new Promise((resolve, reject) => {
        if (userStore.user.token) {
          // 登录
          // 得到需要删除的商品列表的skuId集合
          const ids = this[isClear ? 'invalidList' : 'selectedList'].map(item => item.skuId)
          deleteCart(ids)
            .then(() => {
              return findCartList()
            })
            .then(data => {
              this.setCartList(data.result)
              resolve()
            })
        } else {
          // 本地
          this[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            this.deleteCart(item.skuId)
          })
          resolve()
        }
      })
    },
    // 修改规格
    updateCartSku({ oldSkuId, newSku }) {
      const userStore = useUserStore()
      return new Promise((resolve, reject) => {
        if (userStore.user.token) {
          // 登录
          const oldGoods = this.list.find(item => item.skuId === oldSkuId)
          deleteCart([oldSkuId])
            .then(() => {
              return this.insertAsyncCart({ skuId: newSku.skuId, count: oldGoods.count })
            })
            .then(() => {
              return findCartList()
            })
            .then(data => {
              this.setCartList(data.result)
              resolve()
            })
        } else {
          // 1、获取旧的商品信息
          const oldGoods = this.list.find(item => item.skuId === oldSkuId)
          // 2、删除旧的商品
          this.deleteCart(oldSkuId)
          // 3. 合并一条新的商品信息
          const { skuId, price: nowPrice, inventory: stock, specsText: attrsText } = newSku
          const newGoods = { ...oldGoods, skuId, nowPrice, stock, attrsText }
          // 4. 去插入即可
          this.insertCart(newGoods)
          resolve()
        }
      })
    },
    // 设置购物车列表
    setCartList(list) {
      this.list = list
    },
    // 合并本地购物车
    async mergetLocalCart() {
      const cartList = this.validList.map(({ skuId, selected, count }) => {
        return { skuId, selected, count }
      })
      console.log(this.validList)
      await mergeLocalCart(cartList)
      // 合并成功将本地购物车删除
      this.setCartList([])
    }
  }
})
