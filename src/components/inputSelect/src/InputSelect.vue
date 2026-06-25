<template>
  <div style="display: flex; gap: 6px; align-items: center; " :style="{maxWidth: maxWidth}">
    <!-- 普通关键词输入 -->
    <el-input-tag
      v-if="!selectValue.key"
      @keydown="preventKeydown"
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="collapseTag"

      ref="inputRef"
      v-model="displayTagValues"
      :style="{ minWidth: String(width) + 'px' }"
      :placeholder="placeholder"
      @add-tag="addFreeTag"
      @remove-tag="removeFreeTag"
      @blur="blurHandler"
      @focus="collapseTag=99"
    >
      <template #prefix>
        <div class="tc-input-select">
          <el-cascader v-model="cascaderValue" ref="cascaderRef" :options="props.selectOptions"
                       @change="handleChange" />
        </div>
      </template>

      <template #suffix>
        <el-icon @click="filterInput" v-if="searchIcon">
          <Search />
        </el-icon>
      </template>
    </el-input-tag>

    <!-- 条件搜索输入 -->
    <el-input
      v-else
      ref="customInputRef"
      v-model="customValue"
      :style="{ minWidth: String(width2) + 'px' }"
      placeholder="按回车键搜索"
      @keyup.enter="addConditionTag"
    >
      <template #prefix>
        <div class="tc-input-select">
          <el-cascader :options="props.selectOptions" @change="handleChange" />
        </div>

        <el-tag
          v-for="tag in showTags"
          :key="tag.raw"
          class="mr-5"
          type="info"
          closable
          @close="removeTag(tag)"
        >
          {{ tag.raw }}
        </el-tag>

        <el-tag
          v-if="hiddenCount > 0"
          type="info"
        >
          +{{ hiddenCount }}
        </el-tag>

        <span style="margin-left: 5px; font-size: 13px; color: #333;">
          {{ selectValue.label }}:
        </span>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import type { PropType } from 'vue'
import { SearchTag, SelectOption } from '@/components/inputSelect/src/type'

const props = defineProps({
  width: {
    type: Number,
    default: 250
  },
  selectOptions: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },
  placeholder: {
    type: String,
    default: '请输入关键字'
  },
  maxWidth: {
    type: Number,
    default: 550
  },
  keydown: {
    type: Boolean,
    default: false
  },
  searchIcon: {
    type: Boolean,
    default: true
  }
})

const preventKeydown = (e: KeyboardEvent) => {
  if (props.keydown) {
    e.preventDefault()
  }
}

const tags = ref<SearchTag[]>([])
const collapseTag = ref<number>(3)
const cascaderRef = ref<any>(null)
const selectValue = ref<SearchTag>({
  key: '',
  label: '',
  value: '',
  raw: ''
})
const customValue = ref('')
const width2 = ref(300)

const blurHandler = (event: FocusEvent) => {
  const el = inputRef.value?.$el as HTMLElement
  const width = el.offsetWidth
  collapseTag.value = 3
  console.log('input offsetWidth', width)
  if (width >= props.maxWidth) {
    collapseTag.value = 1
  }
}

const showTags = computed(() => {
  return tags.value.slice(0, collapseTag.value)
})
const hiddenCount = computed(() => {
  return Math.max(tags.value.length - collapseTag.value, 0)
})


const inputRef = ref<any>(null)
const customInputRef = ref<any>(null)
const cascaderValue = ref<string[]>([])


const displayTagValues = ref<string[]>([])


const handleChange = (value: string[]) => {
  const key = value[0]
  const options = props.selectOptions.filter(v => v.value === key)

  // todo if value.length == 2 不好
  if (value.length === 2 && options[0].children?.length) {
    const child = options[0].children.filter((v: any) => v.value === value[1])[0]
    tags.value = tags.value.filter(t => t.key !== key)
    tags.value.push(buildTag(key, child.label, options[0].label))
    filterInput()
    cascaderValue.value = []
    return
  }

  selectValue.value = {
    key: key,
    label: options[0].label,
    value: '',
    raw: ''
  }
  updateWidthByTag(selectValue.value, 'add')
  cascaderValue.value = []
}


const buildTag = (key: string | undefined, value: string, label: string | undefined): SearchTag => ({
  key,
  value,
  label,
  raw: key ? `${label}:${value}` : value
})


const addFreeTag = (val: string) => {
  if (!val) return
  if (tags.value.some(t => t.raw === val)) return

  tags.value.push(buildTag(undefined, val, undefined))
  filterInput()
}

const removeFreeTag = (val: string) => {
  tags.value = tags.value.filter(t => t.raw !== val)
  filterInput()
}

// 条件关键词
const addConditionTag = () => {
  if (!customValue.value) {
    resetSelectValue()
    customValue.value = ''
    return
  }

  tags.value = tags.value.filter(t => t.key !== selectValue.value.key) // delete old
  tags.value.push(buildTag(selectValue.value.key, customValue.value, selectValue.value.label))

  resetSelectValue()
  customValue.value = ''

  filterInput()

  nextTick(() => {
    inputRef.value.focus()
  })
}

const resetSelectValue = () => {
  selectValue.value = {
    key: '',
    label: '',
    value: '',
    raw: ''
  }
}

// 删除 tag
const removeTag = (tag: SearchTag) => {
  updateWidthByTag(tag, 'remove')
  tags.value = tags.value.filter(t => t !== tag)
  filterInput()
}


const emit = defineEmits(['filter'])
const filterInput = () => {
  const matched: Record<string, any>[] = []
  const unmatched: string[] = []

  for (const tag of tags.value) {
    if (!tag.key) {
      unmatched.push(tag.value)
      continue
    }

    const option = props.selectOptions.find(o => o.value === tag.key)
    if (!option) continue

    if ('children' in option && option.children?.length) {
      const child = option.children.find((v: any) => v.label === tag.value)
      if (child) {
        matched.push({ [option.value]: child.value })
      }
    } else {
      matched.push({ [option.value]: tag.value })
    }
  }

  const res = {
    ...Object.assign({}, ...matched),
    q: unmatched
  }
  console.log('filter input:', res)


  // id => ids[]
  if (Object.keys(res).includes('id')) {
    res.ids = [res.id]
    delete res.id
  }

  // 写死 特殊处理
  if (Object.keys(res).includes('attributes.ip')) {
    res.attributes = {
      ip: res['attributes.ip']
    }
  }

  emit('filter', res)
}


const TAG_GAP = 6

const updateWidthByTag = (tag: SearchTag, action: 'add' | 'remove') => {
  nextTick(() => {
    const inputEl = customInputRef.value?.$el || customInputRef.value
    if (!inputEl) return

    const tagEls = inputEl.parentNode?.querySelectorAll('.el-tag') || []

    if (action === 'add') {
      let total = props.width
      tagEls.forEach((el: HTMLElement) => {
        total += el.offsetWidth + TAG_GAP
      })

      width2.value = total
    }

    if (action === 'remove') {
      let removedWidth = 0
      tagEls.forEach((el: HTMLElement) => {
        if (el.textContent === tag.raw) {
          removedWidth = el.offsetWidth + TAG_GAP
        }
      })
      width2.value = Math.max(width2.value - removedWidth, props.width)
    }
  })
}


watch(selectValue, async val => {
  await nextTick()
  val ? customInputRef.value?.focus() : inputRef.value?.focus()
})


const resetFields = () => {
  tags.value = []
  resetSelectValue()
  customValue.value = ''
}

watch(
  tags,
  () => {
    displayTagValues.value = tags.value.map(t => t.raw)
  },
  { deep: true, immediate: true }
)

defineExpose({
  resetFields
})
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.tc-input-select {
  :deep(.el-input) {
    width: 20px !important;
  }

  :deep(.el-cascader .el-input .el-input__inner:read-only) {
    display: none !important;
  }

  :deep(.el-input--small .el-input__wrapper) {
    padding: 0 !important;
    display: contents;
  }

  :deep(.el-input .el-input__icon) {
    margin-left: 4px !important;
  }
}
</style>
