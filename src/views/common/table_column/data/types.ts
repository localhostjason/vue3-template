export type ColumnRenderType =
  | 'link'
  | 'link_id'
  | 'copy'
  | 'color'
  | 'trans'
  | 'dateFormat'
  | 'switch' //
  | 'length_link' //
  | 'text_state' //
  | 'state_icon' //


export interface Column {
  label: string
  field: string
  disabled?: boolean
  init?: boolean
  width?: string
  sortable?: boolean | string
  hideTip?: boolean
  align?: 'left' | 'center' | 'right'

  renderType?: ColumnRenderType
  renderResource?: string | any
}
