import useSWR from 'swr'

import { Reservation } from '@api/reservation/[name]'
import { ThemeToggleButton } from '@components/theme-button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { getLogger } from '@libs/logger'
import { getSWRManager } from '@libs/swr'
import { timestampToDate } from '@libs/timestamp'
import { SMSLink } from '@components/link'

const SAMPLE_CS_PHONE: string = '010-5397-8929'
const SAMPLE_CAFE_NAME: string = '카페OGO'

export default function CafeReservation() {
  const logger = getLogger()
  const swrManager = getSWRManager()
  logger.log('CafeReservation', `visit`, { cafe_name: SAMPLE_CAFE_NAME })

  const { data: reservationArray, isLoading } = useSWR<Reservation[], Error>(
    `/api/reservation/${SAMPLE_CAFE_NAME}`,
    swrManager.getFetcher(),
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-start sm:p-24 p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex flex-row items-center justify-center mb-4 gap-4">
            <ThemeToggleButton />
            <h1 className="font-semibold text-2xl">{SAMPLE_CAFE_NAME}</h1>
          </div>
          {reservationArray && <ReservationTable reservationArray={reservationArray} />}
        </>
      )}
    </main>
  )
}

const ReservationTable = ({ reservationArray }: { reservationArray: Reservation[] }) => {
  return (
    <Table className="mx-auto min-w-max w-fit">
      <TableCaption className="my-4">
        문의는 <SMSLink>{SAMPLE_CS_PHONE}</SMSLink>로 문자 남겨주세요.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">날짜</TableHead>
          <TableHead className="text-center">시간</TableHead>
          <TableHead className="text-center">인원</TableHead>
          <TableHead className="text-center">남성</TableHead>
          <TableHead className="text-center">여성</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reservationArray.map((info, idx) => {
          const { date, hour } = timestampToDate(info.timestamp)
          return (
            <TableRow key={`reservation-${idx}`}>
              <TableCell className="text-center">{date}</TableCell>
              <TableCell className="text-center">{hour}</TableCell>
              <TableCell className="text-center">
                {info.count}:{info.count}
              </TableCell>
              <TableCell className="text-center">
                <SMSLink>{info.phone.male}</SMSLink>
              </TableCell>
              <TableCell className="text-center">
                <SMSLink>{info.phone.female}</SMSLink>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
