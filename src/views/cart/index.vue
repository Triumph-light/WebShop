<script setup>
import { defineComponent, getCurrentInstance } from 'vue'

import GoodsRelevant from '@/components/GoodsRelevant.vue'
import CartSku from '@/components/cart/CartSku.vue'
import { useCartStore, useUserStore } from '../../stores'
import { useRouter } from 'vue-router'

defineComponent({
  name: 'CartPage'
})

// 当前组件实例
const instance = getCurrentInstance()

const cartStore = useCartStore()
const userStore = useUserStore()

const router = useRouter()

// 单选功能
const checkOne = (skuId, selected) => {
  console.log(skuId, selected)
  cartStore.updateCart({ skuId, selected })
}
// 全选功能
const checkAll = selected => {
  console.log(selected)
  cartStore.checkAsyncALlCart(selected)
}
// 删除操作
const deleteCart = skuId => {
  instance.proxy
    .$confirm({ text: '您确定从购物车删除该商品吗？' })
    .then(() => {
      console.log('点击确认')
      cartStore.deleteAysncCart(skuId)
    })
    .catch(e => {
      console.log('点击取消')
    })
}
// 批量删除
const batchDeleteCar = isClear => {
  instance.proxy
    .$confirm({
      text: `您确定从购物车删除${isClear ? '失效' : '选中'}的商品吗`
    })
    .then(() => {
      cartStore.batchDeleteCart(isClear)
    })
    .catch(e => {})
}

// 修改数量
const changeCount = (skuId, count) => {
  cartStore.updateAsyncCart({ skuId, count })
}

// 更新规格
const updateCartSku = (oldSkuId, newSku) => {
  cartStore.updateCartSku({ oldSkuId, newSku })
}

// 跳转结算页面
const goCheckout = () => {
  if (cartStore.selectedTotal === 0)
    return instance.proxy.$message({ text: '至少选中一件商品才能结算' })
  if (!userStore.user.token) {
    instance.proxy
      .$confirm({ text: '下单结算需要登录，您是否去登录？' })
      .then(() => {
        router.push('/member/checkout')
      })
      .catch(e => {})
  } else {
    router.push('/member/checkout')
  }
}
</script>

<template>
  <div class="xtx-cart-page">
    <div class="container">
      <WebShopBread>
        <WebShopBreadItem to="/">首页</WebShopBreadItem>
        <WebShopBreadItem>购物车</WebShopBreadItem>
      </WebShopBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <WebShopCheckBox :modelValue="cartStore.isCheckAll" @update:modelValue="checkAll"
                  >全选</WebShopCheckBox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <tbody v-if="cartStore.validList.length > 0">
            <tr v-for="item in cartStore.validList" :key="item.skuId">
              <td>
                <WebShopCheckBox
                  v-model="item.selected"
                  @click="checkOne(item.skuId, item.selected)"
                ></WebShopCheckBox>
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"
                    ><img :src="item.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <!-- 选择规格组件 -->
                    <CartSku
                      :attrsText="item.attrsText"
                      :skuId="item.skuId"
                      @change="updateCartSku(item.skuId, $event)"
                    ></CartSku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时降价
                  <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <WebShopNumBox
                  :modelValue="item.count"
                  @update:modelValue="changeCount(item.skuId, $event)"
                ></WebShopNumBox>
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (item.nowPrice * 100 * item.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;" @click="deleteCart(item.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="cartStore.invalidList.length > 0">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="item in cartStore.validList" :key="item.skuId">
              <td><WebShopCheckBox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
              </td>
              <td class="tc">{{ item.count }}</td>
              <td class="tc">
                <p>&yen;{{ (item.nowPrice * 100 * item.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a class="green" href="javascript:;" @click="deleteCart(skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <WebShopCheckBox :modelValue="cartStore.isCheckAll" @update:modelValue="checkAll"
            >全选</WebShopCheckBox
          >
          <a href="javascript:;" @click="batchDeleteCar(false)">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCar(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ cartStore.validTotal }} 件商品，已选择 {{ cartStore.selectedTotal }} 件，商品合计：
          <span class="red">{{ cartStore.selectedAmount }}</span>
          <WebShopButton type="primary" @click="goCheckout">下单结算</WebShopButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodsRelevant></GoodsRelevant>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: $priceColor;
}
.green {
  color: $webshopColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
