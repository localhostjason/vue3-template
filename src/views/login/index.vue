<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="form" :rules="rules" class="login-form" auto-complete="on" label-position="left" size="large">
      <div class="title-container">
        <h3 class="title">
          <span>VUE3</span>
          <span class="text-explode">|</span>
          <span>管理系统</span>
        </h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container"><svg-icon icon-class="user" /></span>
        <el-input
          v-model="form.username"
          :autofocus="isAutoFocus"
          placeholder="请输入用户名"
          name="username"
          type="text"
          auto-complete="on"
          size="large"
        ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container"><svg-icon icon-class="password" /></span>
        <el-input
          :type="passwordType"
          v-model="form.password"
          placeholder="请输入密码"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
          size="large"
        ></el-input>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" @click.native.prevent="handleLogin(loginForm)" size="large"
        >登录
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { useStore } from 'vuex'
import { login } from '@/api/auth'

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore()

    const form = reactive<object>({
      username: 'admin',
      password: '123'
    })

    const rules = reactive<FormRules>({
      username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
      password: [{ required: true, trigger: 'blur', message: '请输入密码' }]
    })
    const loginForm = ref<FormInstance>()

    const passwordType = ref<string>('password')
    const loading = ref<boolean>(false)
    const isAutoFocus = ref<boolean>(true)

    const handleLogin = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate(async (valid, fields) => {
        if (!valid) return

        loading.value = true

        try {
          const { token } = await login(form)
          await store.dispatch('user/setToken', token)
        } catch (e) {}
        loading.value = false
      })
    }

    return {
      form,
      rules,
      loginForm,
      passwordType,
      loading,
      isAutoFocus,
      handleLogin
    }
  }
})
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #283443;
$light_gray: #eee;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;

    &::first-line {
      color: $light_gray;
    }
  }
}

/* reset element-ui css */
.login-container {
  .el-input__wrapper {
    background-color: transparent !important;
    border-radius: 0 !important;
    transition: none !important;
    box-shadow: none !important;
  }

  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;

  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;

    .svg-icon {
      font-size: 20px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

.el-input__inner {
  font-size: 14px;
}
</style>
