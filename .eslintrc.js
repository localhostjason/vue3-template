module.exports = {
  root: true,
  env: {
    node: true,

    // Compiler macros such as defineProps and defineEmits generate no-undef warnings
    'vue/setup-compiler-macros': true
  },
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/typescript/recommended'],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 参数 any 不报 warning
    '@typescript-eslint/no-explicit-any': ['off'],

    // 禁止出现空代码块，允许 catch 为空代码块  https://juejin.cn/post/6844904116318126088
    'no-empty': ['warn', { allowEmptyCatch: true }],

    // fix: 'echarts' is assigned a value but never used        @typescript-eslint/no-unused-vars 等等
    '@typescript-eslint/no-unused-vars': 'off',

    // fix: <template #header="{ close, titleId, titleClass }"> close 未使用
    'vue/no-unused-vars': 'off',

    // fix:  formRef.value!.clearValidate() 中”！“
    '@typescript-eslint/no-non-null-assertion': 'off',

    // fix: 忽略组件名称：驼峰
    'vue/multi-word-component-names': 'off',
  },

  // Vue中:error ‘XXXXX‘ is not defined no-undef解决办法
  globals: {
    PropType: 'readonly'
  }
}
