<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card class="tc-card" shadow="never">
          <template #header>
            <div class="clearfix">
              <h5>基本信息</h5>
            </div>
          </template>
          <el-row>
            <el-col :span="24">
              <el-descriptions :column="1" label-width="120" style="margin-left: 4px">
                <el-descriptions-item label="ID">{{ info.id }}</el-descriptions-item>
                <el-descriptions-item label="用户名">{{ info.username }}</el-descriptions-item>
                <el-descriptions-item label="角色">{{ info.role }}</el-descriptions-item>
                <el-descriptions-item label="上次登录时间">
                  {{ info.last_login_time ? dateFormat(info.last_login_time) : '-' }}</el-descriptions-item>
                <el-descriptions-item label="创建时间">{{ dateFormat(info.time) }}</el-descriptions-item>
                <el-descriptions-item label="描述">{{ info.desc || '-' }}</el-descriptions-item>
              </el-descriptions>
            </el-col>
          </el-row>
        </el-card>

      </el-col>

    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { dateFormat } from '@/utils'
import { User } from '@/views/user/list/type'

const info = ref<User>({} as unknown as User)
const userId = ref<string>('')
const loadUser = async (id: string) => {
  info.value = { username: 'testuser', last_login_time: new Date } as unknown as User
  userId.value = id
}

defineExpose({
  loadUser
})
</script>

<style scoped>

</style>
