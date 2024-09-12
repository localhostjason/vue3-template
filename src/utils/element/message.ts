import { ElMessage } from 'element-plus'

// 消息
const Message = (message: string, duration = 3000): any => {
  return ElMessage({
    message,
    duration
  })
}

// 成功
const successMessage = (message: string, duration = 3000): any => {
  return ElMessage({
    message,
    type: 'success',
    duration
  })
}

// 警告
const warnMessage = (message: string, duration = 3000): any => {
  return ElMessage({
    message,
    type: 'warning',
    duration
  })
}

// 失败
const errorMessage = (message: string, duration = 3000): any => {
  return ElMessage({
    message,
    type: 'error',
    duration
  })
}

export { Message, successMessage, warnMessage, errorMessage }
