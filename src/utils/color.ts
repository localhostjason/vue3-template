/**
 * 根据背景色返回合适的文字颜色（#000 / #fff）
 */
export function getContrastTextColor(bgColor: string): string {
  if (!bgColor) return '#000'

  // 去掉 #
  const color = bgColor.replace('#', '')

  // 支持 #rgb / #rrggbb
  const r = parseInt(color.length === 3 ? color[0] + color[0] : color.slice(0, 2), 16)
  const g = parseInt(color.length === 3 ? color[1] + color[1] : color.slice(2, 4), 16)
  const b = parseInt(color.length === 3 ? color[2] + color[2] : color.slice(4, 6), 16)

  // 亮度公式（WCAG 推荐）
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  return brightness > 160 ? '#000' : '#fff'
}
