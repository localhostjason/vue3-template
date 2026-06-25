<template>
  <el-button v-if="tcDisabled"
             type="info"
             :plain="plain"
             :icon="icon"
             :link="link"
             :loading="loading"
             :disabled="tcDisabled"
  >
    <slot />
  </el-button>
  <el-button v-else
             :type="type"
             :plain="plain"
             :icon="icon"
             :link="link"
             :loading="loading"
             :disabled="disabled"
             :color="link ? '' : '#2f9e9e'"
  >
    <slot />
  </el-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  primary?: boolean
  type?: string
  blue?: boolean
  success?: boolean
  warning?: boolean
  danger?: boolean
  plain?: boolean
  icon?: any
  disabled?: boolean
  loading?: boolean
  tcDisabled?: boolean
  link?: boolean
}>()


</script>
