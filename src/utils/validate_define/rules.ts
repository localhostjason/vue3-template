import isString from 'lodash/isString'

class ValidateRules {
  private readonly trigger: string | string[]

  constructor() {
    this.trigger = 'blur'
  }

  public rRequired(message?: string, transform = true): any {
    if (transform) {
      return {
        required: true,
        transform: (value: string) => value && value.trim(),
        message: message,
        trigger: this.trigger
      }
    }
    return {
      required: true,
      message: message,
      trigger: this.trigger
    }
  }

  public rValidator(fn: any, type?: string): any {
    return {
      type: type || 'integer',
      validator: fn,
      trigger: this.trigger
    }
  }

  public rInteger(min: number, max?: number): any {
    return {
      type: 'integer',
      min: min,
      max: max,
      message: max ? `只能输入${min}至${max}之间的整数` : `只能输入大于${min - 1}的整数`,
      trigger: this.trigger
    }
  }

  public rIntegerV2(min: number, max?: number): any {
    return {
      validator: (_: any, value: any, callback: any) => {
        const num = Number(value)

        if (!Number.isInteger(num)) {
          return callback(new Error('必须是整数'))
        }

        if (max) {
          if (num < min || num > max) {
            return callback(new Error(`只能输入${min}至${max}之间的整数`))
          }
        } else {
          if (num < min) {
            return callback(new Error(`只能输入大于${min - 1}的整数`))
          }
        }

        callback()
      },
      trigger: this.trigger
    }
  }

  public lenLtNum(num: number, trigger?: string | string[]): any {
    return { max: num, message: `输入长度应不超过${num}个字符`, trigger: trigger || this.trigger }
  }
}

export const validateRules = new ValidateRules()

export const isVaNumber = (rule: any, value: any, callback: any) => {
  if (isString(value)) {
    callback(new Error(`请输入数字`))
  }
  callback()
}
