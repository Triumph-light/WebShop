<script setup>
import { ref } from 'vue'

const props = defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
})
// 设定默认情况下的地区
const provinceCode = ref('110000')
const cityCode = ref('119900')
const countryCode = ref('110101')
const fullLocation = ref('北京市 市辖区 东城区')
// 当有默认地址的时候
if (props.goods.userAddresses) {
  const defaultAddr = props.goods.userAddresses.find(addr => addr.isDefault === 1)
  if (defaultAddr) {
    provinceCode.value = defaultAddr.provinceCode
    cityCode.value = defaultAddr.cityCode
    countryCode.value = defaultAddr.countryCode
    fullLocation.value = defaultAddr.fullLocation
  }
}
// 选择城市
const changeCity = result => {
  provinceCode.value = result.provinceCode
  cityCode.value = result.cityCode
  countryCode.value = result.countryCode
  fullLocation.value = result.fullLocation
  console.log(result)
}
</script>

<template>
  <p class="g-name">{{ props.goods.name }}</p>
  <p class="g-desc">{{ props.goods.desc }}</p>
  <p class="g-price">
    <span>{{ props.goods.price }}</span>
    <span>{{ props.goods.oldPrice }}</span>
  </p>
  <div class="g-service">
    <dl>
      <dt>促销</dt>
      <dd>12月好物放送，App领券购买直降120元</dd>
    </dl>
    <dl>
      <dt>配送</dt>
      <dd>至<WebShopCity :fullLocation="fullLocation" @change="changeCity"></WebShopCity></dd>
    </dl>
    <dl>
      <dt>服务</dt>
      <dd>
        <span>无忧退货</span>
        <span>快速退款</span>
        <span>免费包邮</span>
        <a href="javascript:;">了解详情</a>
      </dd>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
.g-name {
  font-size: 22px;
}
.g-desc {
  color: #999;
  margin-top: 10px;
}
.g-price {
  margin-top: 10px;
  span {
    &::before {
      content: '¥';
      font-size: 14px;
    }
    &:first-child {
      color: $priceColor;
      margin-right: 10px;
      font-size: 22px;
    }
    &:last-child {
      color: #999;
      text-decoration: line-through;
      font-size: 16px;
    }
  }
}
.g-service {
  background: #f5f5f5;
  width: 500px;
  padding: 20px 10px 0 10px;
  margin-top: 10px;
  dl {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      color: #666;
      &:last-child {
        span {
          margin-right: 10px;
          &::before {
            content: '•';
            color: $webshopColor;
            margin-right: 2px;
          }
        }
        a {
          color: $webshopColor;
        }
      }
      .xtx-city {
        margin-left: 10px;
      }
    }
  }
}
</style>
