<template>
  <div class="filter-form">
    <div class="pull-left">
      <slot name="button"></slot>
    </div>
    <div :class="formClass">
      <div class="pull-left">
        <el-form :inline="true" @submit.prevent>
          <el-form-item>
            <InputSelect ref="inputRef" placeholder="用户名 / 昵称 / 描述 / 用户组" @filter="filterUser"
                         :select-options="options"></InputSelect>
          </el-form-item>
        </el-form>
      </div>
      <div class="pull-right">
        <TableColumnSettingBtn :ck="ck"></TableColumnSettingBtn>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputSelect from '@/components/inputSelect/src/InputSelect.vue'
import TableColumnSettingBtn from '@/views/common/table_column/TableColumnSettingBtn.vue'
import { UserColumnKey } from '@/views/common/table_column/data/user'
import { ref, watch } from 'vue'

const props = defineProps({
  ck: {
    type: String,
    default: UserColumnKey
  },
  formClass: {
    type: String,
    default: 'pull-right'
  }
})

const options = [
  { label: 'ID', value: 'id' },
  { label: '用户名', value: 'username' },
  { label: '昵称', value: 'nickname' },
  { label: '用户组', value: 'group_name' },
  { label: '描述', value: 'desc' },
  {
    label: '状态', value: 'status', children: [
      { value: 'active', label: '启用' },
      { value: 'disabled', label: '禁用' },
      { value: 'locked', label: '锁定' }
    ]
  }
]


const inputArgs = ref<any>(undefined)

const emit = defineEmits(['setParams'])
const filterUser = (input_arg: any) => {
  inputArgs.value = { ...input_arg }

  filter()
}

const filter = () => {
  const args = { ...inputArgs.value }
  emit('setParams', args)
}
</script>

<style lang="scss" scoped>

</style>
