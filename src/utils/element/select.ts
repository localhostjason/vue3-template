/*
 * allow-create 支持：回车、失去焦点选中
 * :filter-method="
                  function (v) {
                    blurSelectValue(form, 'username', v)
                  }
"
* :filter-method="v =>  blurSelectValue(form, 'username', v)" //ts 类型警告？
 *
 * */

export const blurSelectValue = (form: any, key: string, val: any): void => {
  form[key] = val
}
