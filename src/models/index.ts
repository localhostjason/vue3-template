export type PageQuery = {
  page?: number
  per_page?: number
}

export type ItemPage = {
  page: number
  per_page: number
  total: number
  items: any[]
}
