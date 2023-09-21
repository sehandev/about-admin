import moment from 'moment'

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

export function getDateArrayFromTo({ start, end }: { start: string; end: string }): string[] {
  // start, end: YYYY-MM-DD
  const dateArray: string[] = []

  const startDate = moment(start)
  const endDate = moment(end)

  const date = startDate.clone()
  while (date.isSameOrBefore(endDate)) {
    dateArray.push(date.format('YYYY-MM-DD'))
    date.add(1, 'day')
  }

  return dateArray
}
