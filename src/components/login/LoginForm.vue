<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import Message from '../library/Message.js'
import { useUserStore } from '@/stores/index.js'
import schema from '@/utils/vee-validate-schema.js'
import { Field, Form } from 'vee-validate'
import { useIntervalFn } from '@vueuse/core'

import { userAccountLogin, userMobileLoginMsg } from '@/api/user.js'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '../../stores'

const userStore = useUserStore()
const cartStore = useCartStore()
const router = useRouter()
const route = useRoute()

const isMsgLogin = ref(false)
// 表单信息对象
const form = reactive({
  isAgree: true,
  account: 'xiaotuxian001',
  password: '123456',
  mobile: null,
  code: null
})
// 校验规则对象
const mySchema = {
  account: schema.account,
  password: schema.password,
  mobile: schema.mobile,
  code: schema.code,
  isAgree: schema.isAgree
}

// 切换表单元素，还原数据和清除校验效果
const formCom = ref()
watch(isMsgLogin, () => {
  // 还原数据
  form.isAgree = true
  form.account = null
  form.password = null
  form.mobile = null
  form.code = null
  // 补充校验效果清除，Form组件提供resetForm()
  formCom.value.resetForm()
})

const login = async () => {
  const valid = await formCom.value.validate()
  if (valid) {
    let data = null
    try {
      if (!isMsgLogin.value) {
        // 发起登录请求
        data = await userAccountLogin(form)
      } else {
        // 短信登录
        data = await userMobileLoginMsg(form)
      }
    } catch (error) {
      let errorMsg = error.response.data.message
      Message({ type: 'error', text: errorMsg })
    }

    // 1、存储用户信息
    const { id, account, nickname, avatar, token, mobile } = data.result
    userStore.setUser({ id, account, nickname, avatar, token, mobile })
    // 合并购物车操作
    cartStore.mergetLocalCart().then(() => {
      // 2、提示成功
      Message({ type: 'success', text: '登录成功' })
      // 3、跳转
      router.push(route.query.redirectUrl || '/')
    })
  }
}

// 限制发送短信时间
const time = ref(0)
const { pause, resume } = useIntervalFn(
  () => {
    time.value--
    if (time.value <= 0) {
      pause()
    }
  },
  1000,
  false
)
onMounted(() => {
  pause()
})
// 发送短信
const send = async () => {
  // 验证号码是否正确
  const valid = mySchema.mobile(form.mobile)
  if (valid === true) {
    // 没有倒计时可以发送
    if (time.value === 0) {
      await userMobileLoginMsg(form.mobile)
      Message({ type: 'success', text: '发送成功' })
      time.value = 60
      resume()
    }
  } else {
    // 校验失败,显示错误信息
    formCom.value.setFieldError('mobile', valid)
  }
}
</script>

<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      ref="formCom"
      class="form"
      :validation-schema="mySchema"
      autocomplete="off"
      v-slot="{ errors }"
    >
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.account }"
              v-model="form.account"
              name="account"
              type="text"
              placeholder="请输入手机号或者账号"
            />
          </div>
          <div class="error" v-if="errors.account">
            <i class="iconfont icon-warning" />{{ errors.account }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <Field
              :class="{ error: errors.password }"
              v-model="form.password"
              name="password"
              type="password"
              placeholder="请输入密码"
            />
          </div>
          <div class="error" v-if="errors.password">
            <i class="iconfont icon-warning" />{{ errors.password }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <Field
              :class="{ error: errors.mobile }"
              v-model="form.mobile"
              name="mobile"
              type="text"
              placeholder="请输入手机号"
            />
          </div>
          <div class="error" v-if="errors.mobile">
            <i class="iconfont icon-warning" />{{ errors.mobile }}
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <Field
              :class="{ error: errors.code }"
              v-model="form.code"
              name="code"
              type="password"
              placeholder="请输入验证码"
            />
            <span class="code" @click="send">{{
              time === 0 ? '发送验证码' : '${time}秒后发送'
            }}</span>
          </div>
          <div class="error" v-if="errors.code">
            <i class="iconfont icon-warning" />{{ errors.code }}
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <!-- Field 的 as 属性可以指定为其他标签，也可指定为组件。
但是组件需要支持 v-model 否则校验不会触发。 -->
          <Field as="WebShopCheckBox" v-model="form.isAgree" name="isAgree"
            ><span>我已同意</span>
            <a href="javascript:;">《隐私条款》</a>
            <span>和</span>
            <a href="javascript:;">《服务条款》</a></Field
          >
        </div>
      </div>
      <a @click="login" href="javascript:;" class="btn">登录</a>
    </Form>
    <div class="action">
      <img src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png" alt="" />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: $webshopColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: $priceColor;
          }
          &.active,
          &:focus {
            border-color: $webshopColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $webshopColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
