<template>
  <div class="dash-foot">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card" shadow="hover">
          <div>
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="最近销售记录" name="first">
                <el-table :data="rechargeList.data" border>
                  <el-table-column prop="time" label="日期">
                    <template #default="scope">
                      <span>{{ dateFormat(scope.row.time) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="id" label="商品ID"></el-table-column>
                  <el-table-column prop="name" label="商品名"></el-table-column>
                  <el-table-column prop="number" label="金额"></el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="最近登录记录" name="second">
                <el-table :data="operateList.data" border>
                  <el-table-column prop="time" label="日期">
                    <template #default="scope">
                      <span>{{ dateFormat(scope.row.time) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="username" label="用户名"></el-table-column>
                  <el-table-column prop="ip" label="IP地址"></el-table-column>
                  <el-table-column prop="action" label="操作"></el-table-column>
                  <el-table-column prop="result" label="详情"></el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { PageQuery } from '@/models'
import { dateFormat } from '@/utils'

const activeName = ref<string>('first')

const pageQuery = reactive<PageQuery>({
  page: 1,
  per_page: 10
})

const rechargeList = reactive({
  data: [
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:10"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:11"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
    {id: 10001, name: "test", number: 300, time: "2024-09-01 10:10:12"},
  ]
})
const operateList = reactive({
  data: []
})






const tableData = [
  {
    date: '2016-05-03',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-02',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-04',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-01',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-08',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-06',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  },
  {
    date: '2016-05-07',
    name: '王小虎',
    province: '上海',
    city: '普陀区',
    address: '上海市普陀区金沙江路 1518 弄',
    zip: 200333
  }
]
</script>

<style scoped>
.dash-foot {
  margin-top: 18px;
}
</style>
