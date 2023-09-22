import moment from 'moment'
import { useMemo, useState } from 'react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip'
import { CountByType, CountFilterDTO, CountTMPEnum, CountTypeEnum, DateCount } from '@libs/dashboard'
import { getDateArrayFromTo } from '@libs/timestamp'
import { cn } from '@libs/utils'
import { DatePicker } from '@components/date-picker'

const START_DATE = '2023-01-01' // TODO:
const MAX_COUNT = 100 // TODO:
const DAY_HEADER = ['일', '월', '화', '수', '목', '금', '토', '일', '월', '화', '수', '목', '금', '토']

export function Calendar() {
  const [data, _] = useState(SAMPLE_DATA)
  const countFilter = new CountFilterDTO({
    tmp: [CountTMPEnum.Match, CountTMPEnum.Reservation],
    type: [CountTypeEnum.Dark, CountTypeEnum.Cafe],
  })
  const [fromDate, setFromDate] = useState<Date>()
  const dateArray: string[] = useMemo(() => getDateArrayFromXToNow(fromDate), [fromDate])
  const startDay: number = useMemo(() => moment(fromDate).day(), [fromDate])

  return (
    <>
      <div>
        <DatePicker date={fromDate} setDate={setFromDate} />
      </div>
      <div className="grid grid-rows-7 grid-flow-col items-center justify-center gap-1">
        <DayHeader startDay={startDay} />
        {dateArray.map((date: string, idx: number) => {
          return <DateCell key={`date-cell-${idx}`} countData={data} countFilter={countFilter} date={date} />
        })}
      </div>
    </>
  )
}

function calculateTotalCount({ dateCount, filter }: { dateCount: DateCount; filter: CountFilterDTO }): number {
  function addCountByType(typeArray: string[], countByType: CountByType): number {
    const typeCount = Object.values(CountTypeEnum)
      .map((countType) => {
        if (typeArray.includes(countType)) {
          return countByType[countType]
        }
        return 0
      })
      .reduce(function (a, b) {
        return a + b
      })
    return typeCount
  }

  const typeCount = Object.values(CountTMPEnum)
    .map((countTMP) => {
      if (filter.tmp.includes(countTMP)) {
        return addCountByType(filter.type, dateCount[countTMP])
      }
      return 0
    })
    .reduce(function (a, b) {
      return a + b
    })
  return typeCount
}

function getDateArrayFromXToNow(fromDate: Date | undefined) {
  const startDate: string = fromDate ? moment(fromDate).format('YYYY-MM-DD') : moment(START_DATE).format('YYYY-MM-DD')
  const endDate: string = moment().format('YYYY-MM-DD')
  return getDateArrayFromTo({ start: startDate, end: endDate })
}

function getBGByCount(count: number) {
  const level = Math.round((count / MAX_COUNT) * 10)
  switch (level) {
    case 10:
    case 9:
      return 'bg-green-400'
    case 8:
    case 7:
      return 'bg-green-500'
    case 6:
    case 5:
      return 'bg-green-600'
    case 4:
    case 3:
      return 'bg-green-700'
    case 2:
      return 'bg-green-800'
    case 1:
      return 'bg-green-900'
    default:
      return 'bg-[#161b22]'
  }
}

type DateCellProps = {
  countData: DateObject
  countFilter: CountFilterDTO
  date: string
}
const DateCell = ({ countData, countFilter, date }: DateCellProps) => {
  const isActive = countData.hasOwnProperty(date)
  let count: number = 0
  let dateCount: DateCount | null = null
  if (isActive) {
    dateCount = countData[date]
    count = calculateTotalCount({
      dateCount: dateCount,
      filter: countFilter,
    })
  }
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn('flex items-center justify-center w-4 h-4 text-sm text-black', getBGByCount(count))}></div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Date: {date}</p>
          {isActive && dateCount && (
            <>
              <p>Match dark: {dateCount.matchCount.dark}</p>
              <p>Match cafe: {dateCount.matchCount.cafe}</p>
              <p>Reservation dark: {dateCount.reservationCount.dark}</p>
              <p>Reservation cafe: {dateCount.reservationCount.cafe}</p>
              <p>Total count: {count}</p>
            </>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

interface DayHeaderType {
  startDay: number
}
const DayHeader = ({ startDay }: DayHeaderType) => {
  return DAY_HEADER.slice(startDay, startDay + 7).map((date, idx) => (
    <div key={`date-header-${idx}`} className="flex items-center justify-center w-4 h-4 text-sm">
      {date}
    </div>
  ))
}

interface DateObject {
  [index: string]: DateCount
}

// TODO:
const SAMPLE_DATA: DateObject = {
  '2023-08-01': new DateCount({
    reservationCount: new CountByType({ cafe: 6 }),
    matchCount: new CountByType({ dark: 4 }),
  }),
  '2023-08-04': new DateCount({
    reservationCount: new CountByType({ cafe: 18 }),
    matchCount: new CountByType({ dark: 2 }),
  }),
  '2023-08-05': new DateCount({
    reservationCount: new CountByType({ cafe: 13 }),
    matchCount: new CountByType({ dark: 13 }),
  }),
  '2023-08-08': new DateCount({
    reservationCount: new CountByType({ cafe: 21 }),
    matchCount: new CountByType({ dark: 19 }),
  }),
  '2023-08-11': new DateCount({
    reservationCount: new CountByType({ cafe: 34 }),
    matchCount: new CountByType({ dark: 20 }),
  }),
  '2023-08-12': new DateCount({
    reservationCount: new CountByType({ cafe: 38 }),
    matchCount: new CountByType({ dark: 20 }),
  }),
  '2023-08-14': new DateCount({
    reservationCount: new CountByType({ cafe: 38 }),
    matchCount: new CountByType({ dark: 30 }),
  }),
  '2023-08-16': new DateCount({
    reservationCount: new CountByType({ cafe: 38 }),
    matchCount: new CountByType({ dark: 40 }),
  }),
  '2023-08-18': new DateCount({
    reservationCount: new CountByType({ cafe: 38 }),
    matchCount: new CountByType({ dark: 50 }),
  }),
}
