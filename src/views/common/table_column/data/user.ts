import { Column } from '@/views/common/table_column/data/types'


export const UserColumnKey = 'user'


export const userColumn: Record<string, Column[]> = {
  [UserColumnKey]: [
    { label: 'ID', field: 'id', width: '270', renderType: 'copy' },
    { label: '用户名', field: 'username', disabled: true, init: true, renderType: 'link', renderResource: 'base' },
    { label: '角色', field: 'role', init: true, width: '180' },
    { label: '上次登录时间', field: 'last_login_time', init: true, width: '180', renderType: 'dateFormat' },
    { label: '描述', field: 'desc', init: true, width: '200' },
    { label: '创建时间', field: 'time', width: '200', renderType: 'dateFormat' }
  ]
}
