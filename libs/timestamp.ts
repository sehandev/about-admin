export function timestampToDate(timestamp: number): { date: string; hour: string } {
  const dateObj = new Date(timestamp * 1000) // Multiply by 1000 to convert from seconds to milliseconds
  const dateStr = dateObj.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'utc',
  }) // 9월 18일 오후 5:00

  const [month, day, _, hour] = dateStr.split(' ')
  // month: "9월"
  // day: "18일"
  // hour: "5:00"

  return { date: `${month} ${day}`, hour: hour }
}
