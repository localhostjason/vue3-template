<template>
  <div class="over-scrollbar" v-loading="loading">
    <el-row>
      <div class="div_title_no_border">基本配置</div>
    </el-row>
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-row>
        <el-col :span="24">
          <el-form-item label="用户名" :prop="user_id ? '-' : 'username'">
            <span class="text-gray-ol sm" v-if="user_id">{{ form.username }}</span>
            <el-input v-model.trim="form.username" v-else maxlength="32" show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="邮件" prop="email">
            <el-input v-model.trim="form.email" maxlength="32" show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password" v-if="!user_id">
            <el-input type="password" v-model.trim="form.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPassword" v-if="!user_id">
            <el-input type="password" v-model.trim="form.checkPassword"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="desc">
            <el-input
              type="textarea"
              v-model="form.desc"
              :autosize="{ minRows: 4 }"
              maxlength="128"
              show-word-limit
            ></el-input>
          </el-form-item>

          <el-form-item>
            <tc-button type="primary" @click="submit" class="width-65">保 存</tc-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { validate } from '@/utils/element/form'
import { successMessage } from '@/utils/element/message'
import { setFormData } from '@/utils'
import { validateRules as vali } from '@/utils/validate_define/rules'
import TcButton from '@/components/TcButton/src/TcButton.vue'
import { ModifyUserForm } from '@/views/user/list/type'

const formRef = ref<FormInstance>()
const user_id = ref<string>('')
const loading = ref<boolean>(false)

const form = reactive<ModifyUserForm>({
  username: '',
  password: '',
  checkPassword: '',
  desc: '',
  email: ''
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (!value) callback(new Error('请输入密码'))
  if (form.checkPassword !== '') formRef.value!.validateField('checkPassword', () => void 0)
  callback()
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (!value) callback(new Error('请再次输入密码'))
  if (value !== form.password) callback(new Error('两次输入密码不一致!'))
  callback()
}

const rules = reactive<FormRules>({
  username: [vali.rRequired('请输入用户名'), vali.lenLtNum(32)],
  password: [{
    validator: validatePass,
    transform: (value: string) => value && value.trim(),
    required: true,
    trigger: 'blur'
  }, vali.lenLtNum(32)],
  checkPassword: [{
    validator: validatePass2,
    transform: (value: string) => value && value.trim(),
    required: true,
    trigger: 'blur'
  }, vali.lenLtNum(32)],
  desc: [{ max: 128, message: '最大字数不超过128个', trigger: ['blur', 'change'] }]
})


const loadUser = (id: string) => {
  user_id.value = id
  loading.value = true

  nextTick(async () => {
    if (id) {
      const item = {
        username: 'testuser',
        email: ''
      }
      formRef.value!.clearValidate()
      setFormData(form, item)
      loading.value = false
      return
    }
    formRef.value!.resetFields()
    loading.value = false
  })
}


const emit = defineEmits(['reloadUsers'])
const submit = async () => {
  const valid = await validate(formRef)
  if (!valid) return

  const body = { ...form }
  try {
    if (user_id.value) {
      successMessage('修改用户成功')
    } else {
      successMessage('创建用户成功')
    }
    emit('reloadUsers')
  } catch (e) {
  }
}


defineExpose({
  loadUser
})
</script>

<style></style>
