<template>
  <div class="over-scrollbar">
    <el-row>
      <el-col :span="24">
        <el-tabs v-model="activeName" class="asset-tab" @tab-change="changeTab">
          <el-tab-pane label="基本信息" name="base">
            <UserDetailBase ref="baseRef"></UserDetailBase>
          </el-tab-pane>

        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import UserDetailBase from '@/views/user/list/components/UserDetailBase.vue'
const userId = ref<string>('')
const activeName = ref<string>('base')
const baseRef = ref<any>(null)

const changeTab = (val: string) => {
  nextTick(() => {
    switch (val) {
      case 'base':
        baseRef.value.loadUser(userId.value)
        break
    }
  })
}

const loadUser = async (id: string, active_name?: string) => {
  userId.value = id
  activeName.value = active_name || 'base'
  changeTab(activeName.value)
}


defineExpose({
  loadUser
})
</script>


<style scoped>

</style>
