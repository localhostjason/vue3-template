import { PropType as VuePropType } from 'vue'

declare global {
  // vue
  declare type PropType<T> = VuePropType<T>

  declare type Recordable<T = any> = Record<string, T>
}
