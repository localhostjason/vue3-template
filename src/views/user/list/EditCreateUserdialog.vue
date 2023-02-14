<template>
  <div>
    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="550px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <el-row>
        <el-col :span="24">
          <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
            <el-form-item label="用户名" prop="username">
              <span class="text-gray-lg sm" v-if='form.user_id'>{{ form.username }}</span>
              
            </el-form-item>

            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="form.email" style="width: calc(100% - 70px)"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="desc">
              <el-input
                type="textarea"
                v-model="form.desc"
                :autosize="{ minRows: 4 }"
                style="width: calc(100% - 70px)"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog.visible = false">取 消</el-button>
          <el-button type="primary" @click="updateUser">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { ElMessageBox, FormInstance, FormRules } from 'element-plus'

import pick from 'lodash/pick'
import { validate } from '@/utils/element/form'
import { successMessage } from '@/utils/element/message'

const dialog = reactive<any>({
  visible: false,
  title: ''
})
const formRef = ref<FormInstance>()

const form = reactive<any>({
  user_id: null,
  username: '',
  email: '',
  desc: ''
})

const rules = reactive<FormRules>({
  email: { required: true, message: '请输入邮箱', trigger: 'blur' }
})

const showDialog = (row: any = null) => {
  dialog.visible = true

  dialog.title = row ? '编辑用户' : '创建用户'
  form.user_id = row ? row.id : void 0

  nextTick(() => {
    if (row) {
      form.username = row.username
      form.email = row.email
      form.desc = row.desc

      formRef.value.clearValidate()
      return
    }
    formRef.value.resetFields()
  })
}

const emit = defineEmits(['reloadUsers'])
const updateUser = async () => {
  const valid = await validate(formRef)
  if (!valid) return

  try {
    if (form.user_id) {
      // send update user api
      successMessage('修改用户成功')
    } else {
      // send create user api
      successMessage('创建用户成功')
    }
    dialog.visible = false
    emit('reloadUsers')
  } catch (e) {}
}

defineExpose({
  showDialog
})
</script>

<style></style>
