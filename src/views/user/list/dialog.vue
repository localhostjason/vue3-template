<template>
  <div>
    <el-dialog v-model="dialogVisible" title="Tips" width="30%" top="15vh" :before-close="handleClose">
      <span>This is a message</span>
      <span>{{ foo }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="submit"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { onMounted } from '@vue/runtime-core'

const dialogVisible = ref<boolean>(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const showDialog = () => {
  dialogVisible.value = true
}

defineExpose({
  showDialog
})

const emit = defineEmits(['submit'])
const submit = () => {
  dialogVisible.value = false
  emit('submit')
}

const props = defineProps({
  foo: String
})
</script>

<style>
.el-overlay-dialog {
  top: 100px;
}
</style>
