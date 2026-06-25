<template>
  <div>
    <panel-title title="用户管理"></panel-title>

    <UserFilter ref="userFilterRef" @setParams="setParams">
      <template #button>
        <tc-button type="primary" @click="createUser">+ 新建</tc-button>
        <el-divider direction="vertical" />
        <el-dropdown trigger="click">
          <tc-button type="primary" plain :disabled="!selectedUsers.length">
            更多操作
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </tc-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Delete" @click="delUsers">批量删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </UserFilter>

    <el-row>
      <el-col :span="24">
        <el-table v-loading="state.loading" :data="state.data" ref="tableRef" row-key="id"
                  border
                  class="full-width-table"
                  @selection-change="handleSelectionChange">
          <el-table-column :reserve-selection="true" type="selection" width="50" align="center"></el-table-column>

          <CommonTableColumn :column-key="UserColumnKey" @showDetail="showDetail"></CommonTableColumn>

          <el-table-column label="操作" width="120" fixed="right" align="center">
            <template #default="scope">
              <el-button type="primary" link @click="editUser(scope.row)">编辑</el-button>
              <el-divider direction="vertical" />
              <el-dropdown trigger="click" popper-class="tc-dropdown">
                <span class="el-dropdown-link">
                  <el-button type="primary" link>更多</el-button>
                  <el-icon class="span-color sm" style="vertical-align: middle;"><arrow-down /></el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="delUser(scope.row)">
                      <el-button type="danger" link>删除用户</el-button>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-pagination
          class="pull-right"
          :current-page="pageQuery.page"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="pageQuery.per_page"
          :total="state.total"
          background
          layout="total, prev, pager, next, sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>

    <el-drawer v-model="drawer" :title="drawerTitle" size="50%" class="tc-drawer" :destroy-on-close="true">
      <ModifyUser ref="modifyRef" @reloadUsers="reloadUsers"></ModifyUser>
    </el-drawer>

    <el-drawer v-model="drawerDetail" size="50%" :title="drawerTitle">
      <UserDetail ref="detailRef"></UserDetail>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import PanelTitle from '@/components/PanelTitle'
import { nextTick, reactive, ref } from 'vue'
import { getUsers } from '@/api/user/users'
import { confirmWarning } from '@/utils/element/messageBox'
import { User, UserState } from '@/views/user/list/type'
import TcButton from '@/components/TcButton/src/TcButton.vue'
import { ArrowDown, Delete } from '@element-plus/icons-vue'
import UserFilter from '@/views/user/list/UserFilter.vue'
import { PageQuery } from '@/models'
import CommonTableColumn from '@/views/common/table_column/CommonTableColumn.vue'
import { UserColumnKey } from '@/views/common/table_column/data/user'
import ModifyUser from '@/views/user/list/ModifyUser.vue'
import UserDetail from '@/views/user/list/UserDetail.vue'

const pageQuery = ref<PageQuery>({})
const args = ref<any>({})
const selectedUsers = ref<User[]>([])


// 定义
const state = reactive<UserState>({
  data: [],
  loading: false,
  total: 0
})

const drawer = ref<boolean>(false)
const drawerDetail = ref<boolean>(false)
const drawerTitle = ref<string>('')
const currentId = ref<string>('')
const modifyRef = ref<any>(null)
const detailRef = ref<any>(null)

const createUser = async () => {
  drawer.value = true
  currentId.value = ''
  drawerTitle.value = `创建用户`
  await nextTick()
  await modifyRef.value?.loadUser(currentId.value)
}

const editUser = async (row: User) => {
  drawer.value = true
  currentId.value = String(row.id)
  drawerTitle.value = `编辑用户：${row.username}`
  await nextTick()
  await modifyRef.value?.loadUser(currentId.value)
}
const showDetail = async (row: User, name: string) => {
  drawerDetail.value = true
  currentId.value =String(row.id)
  drawerTitle.value = `用户详情：${row.username}`
  await nextTick()
  await detailRef.value.loadUser(row.id, name)
}


const handleSelectionChange = (rows: User[]) => {
  selectedUsers.value = rows
}
const setParams = (params: any) => {
  args.value = params
  pageQuery.value.page = 1
  getUsersData()
}


const getUsersData = async (): Promise<void> => {
  state.loading = true
  state.data = await getUsers()
  state.loading = false
}

const delUser = async (row: User): Promise<void> => {
  try {
    const data = await confirmWarning('此操作将永久删除用户，是否继续？')
    console.log('data', data)
  } catch (e) {
    console.log('e', e)
  }
}
const delUsers = (): void => {

}
const reloadUsers = async () => {
  await getUsersData()
  drawer.value = false
}

const handleSizeChange = (params_limit: number) => {
  pageQuery.value.page = 1
  pageQuery.value.per_page = params_limit
  getUsersData()
}
const handleCurrentChange = (params_page: number) => {
  pageQuery.value.page = params_page
  getUsersData()
}

const initialize = async (): Promise<void> => {
  await getUsersData()
}

initialize()
</script>

<style scoped></style>
