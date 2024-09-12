
export type Login = {
  username: string
  password: string
}

export type LoginResult = {
  token: string
  username: string
  time: string
  last_login_time: string
  email: string
  role: string
  desc: string
}
