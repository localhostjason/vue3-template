<template>
  <div>
    <panel-title title="用户管理"></panel-title>

    <el-row>
      <el-button type="primary" @click="test">测试</el-button>
    </el-row>
    <el-row>
      <el-table v-loading="state.loading" :data="state.data" ref="tableRef" border>
        <el-table-column prop="username" label="用户名" width="180" />
        <el-table-column prop="role" label="角色" width="180" />
        <el-table-column prop="last_login_time" label="上次登录时间" width="180">
          <template #default="scope">
            <span v-if="scope.row.last_login_time">{{ dateFormat(scope.row.last_login_time) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="描述" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button type="primary" plain size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <dialog-user ref="dialogUser" :foo="state.data.length.toString()" @submit="submitTest"></dialog-user>
  </div>
</template>

<script setup lang="ts">
import PanelTitle from '@/components/PanelTitle/index.vue'
import DialogUser from './dialog.vue'
import { onBeforeMount, reactive, ref, toRaw } from 'vue'
import { getUsers, getUsersList, downloadFile } from '@/api/user/users'
import { dateFormat } from '@/utils/filters'
import { downloadFileByBlob } from '@/utils/download'
import { successMessage } from '@/utils/element/message'

const dialogUser = ref<any>(null)

const state = reactive({
  data: [],
  loading: false
})

onBeforeMount(async () => {
  state.loading = true
  state.data = await getUsersList()
  state.loading = false
})

const test = async () => {
  // dialogUser.value.showDialog()
  try {
    const { data, filename } = await downloadFile()
    await downloadFileByBlob(data, filename)
    successMessage("下载成功")
  } catch (e) {
    console.log('e', e)
  }
}

const submitTest = () => {
  state.data.push({
    date: '2023-01-29',
    name: 'AA',
    address: 'aaa'
  })
}
</script>

<style scoped></style>
