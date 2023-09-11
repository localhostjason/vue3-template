<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts" setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
const type = 'router-link'

const linkProps = (to: any) => {
  return {
    to: to
  }
}
</script>
