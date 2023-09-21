import { FC, ReactNode, useMemo, useState } from 'react'

import { CountByType, CountFilterDTO, CountTMPEnum, CountTypeEnum, DateCount } from '@libs/dashboard'
import { getDateArrayFromTo } from '@libs/timestamp'

const START_DATE = '2023-01-01'
const END_DATE = '2023-12-31'
const DATE_HEADER = ['월', '화', '수', '목', '금', '토', '일']

export function Calendar() {
  const [data, _] = useState(SAMPLE_DATA)
  const countFilter = new CountFilterDTO({
    tmp: [CountTMPEnum.Match, CountTMPEnum.Reservation],
    type: [CountTypeEnum.Dark, CountTypeEnum.Cafe],
  })

  const dateArray = useMemo(() => getDateArrayFromTo({ start: START_DATE, end: END_DATE }), [])

  const DateHeader = () => {
    return DATE_HEADER.map((date, idx) => (
      <div key={`date-header-${idx}`} className="flex items-center justify-center w-4 h-4 text-sm">
        {date}
      </div>
    ))
  }

  type DateCellProps = {
    count: number
  }
  const DateCell = ({ count }: DateCellProps) => {
    return <div className="flex items-center justify-center w-4 h-4 bg-green-300 text-sm text-black">{count}</div>
  }

  return (
    <>
      <div className="flex gap-2">
        <div>_</div>
        <div>1월</div>
        <div>_</div>
        <div>_</div>
        <div>_</div>
        <div>_</div>
        <div>2월</div>
      </div>
      <div className="grid grid-rows-7 grid-flow-col items-center justify-center gap-2">
        <DateHeader />
        {/* TODO: DateCell array */}
        <DateCell count={2} />
        <DateCell count={3} />
        <DateCell count={5} />
      </div>
      <div className="flex gap-2">
        {dateArray.map((date: string, idx: number) => {
          let totalCount: number = 0
          if (data.hasOwnProperty(date)) {
            const dateCount = data[date]
            totalCount = calculateTotalCount({
              dateCount: dateCount,
              filter: countFilter,
            })
            return (
              <ol key={`calendar-data-${idx}`} className="bg-gray-700 my-4">
                {date} - {totalCount}
              </ol>
            )
          }
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

interface DateObject {
  [index: string]: DateCount
}

const SAMPLE_DATA: DateObject = {
  '2023-08-01': new DateCount({
    reservationCount: new CountByType({ cafe: 6 }),
    matchCount: new CountByType({ dark: 4 }),
  }),
  '2023-08-04': new DateCount({
    reservationCount: new CountByType({ cafe: 8 }),
    matchCount: new CountByType({ dark: 2 }),
  }),
  '2023-08-05': new DateCount({
    reservationCount: new CountByType({ cafe: 3 }),
    matchCount: new CountByType({ dark: 3 }),
  }),
  '2023-08-08': new DateCount({
    reservationCount: new CountByType({ cafe: 1 }),
    matchCount: new CountByType({ dark: 9 }),
  }),
}
