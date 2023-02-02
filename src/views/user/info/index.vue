<template>
  <div>
    <panel-title title="个人信息"></panel-title>

    <el-row>
      <el-col :span="9">
        <fieldset>
          <h5 style="margin-bottom: 10px; font-size: 13px">基本信息</h5>

          <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="账号名">
              <span>{{ _username }}</span>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 4 }"></el-input>
            </el-form-item>
          </el-form>
        </fieldset>
      </el-col>
    </el-row>

    <el-button type="primary" style="margin-left: 120px" @click="saveUserInfo">保 存</el-button>
  </div>
</template>

<script setup lang="ts">
import PanelTitle from '@/components/PanelTitle/index'
import { reactive, ref, onBeforeMount } from 'vue'
import { getUserInfo, updateUserInfo } from '@/api/user/auth'
import { validate } from '@/utils/form'
import { successMessage } from '@/utils/message'
import {UserInfoForm} from './models/info'

import type { FormInstance, FormRules } from 'element-plus'

const form = reactive<UserInfoForm>({
  description: ''
})

const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  description: { required: true, message: '请输入描述', trigger: ['blur', 'change'] }
})
const _username = ref<string>('')

onBeforeMount(async () => {
  const { username, description } = await getUserInfo()
  form.description = description
  _username.value = username
})

const saveUserInfo = async () => {
  const valid = await validate(formRef)
  if (!valid) return

  try {
    await updateUserInfo(form)
    successMessage('个人信息更新成功')
  } catch (e) {}
}
</script>

<style scoped></style>
