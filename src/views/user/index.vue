<template>
  <div>
    <panel-title title="用户管理"></panel-title>

    <el-row>
      <el-button type="primary" @click="test">测试</el-button>
    </el-row>
    <el-row>
      <el-table :data="state.data" border>
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </el-row>

    <dialog-user ref="dialogUser" :foo=" state.data.length.toString()" @submit="submitTest"></dialog-user>
  </div>
</template>

<script setup lang="ts">
import PanelTitle from '@/components/PanelTitle/index.vue'
import DialogUser from './dialog.vue'

import { reactive, ref } from 'vue'

const dialogUser = ref<any>(null)

const state = reactive({
  data: []
})

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  }
]
state.data = tableData

const test = () => {
  dialogUser.value.showDialog()
}

const submitTest = () => {
  state.data.push({
    date: '2023-01-29',
    name: 'AA',
    address: 'aaa'
  })
  console.log(222, state.data)
}
</script>

<style scoped></style>
