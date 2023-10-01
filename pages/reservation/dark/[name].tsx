import useSWR from 'swr'

import { SMSLink } from '@components/link'
import { ThemeToggleButton } from '@components/theme-button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@components/ui/table'
import { getLogger } from '@libs/logger'
import { getSWRManager } from '@libs/swr'
import { timestampToDate } from '@libs/timestamp'
import { Reservation } from '@type/reservation'

const SAMPLE_CS_PHONE: string = '010-5140-7750'
const SAMPLE_DARK_NAME: string = '서울대입구점'

export default function DarkReservation() {
  const logger = getLogger()
  const swrManager = getSWRManager()
  logger.log('DarkReservation', `visit`, { store_name: SAMPLE_DARK_NAME })
  const { data: reservationArray, isLoading } = useSWR<Reservation[], Error>(
    swrManager.convertAPI(`/admin/reservation/dark/${SAMPLE_DARK_NAME}`),
    swrManager.getFetcher(),
  )

  return (
    <main className="flex flex-col items-center justify-start min-h-screen sm:p-24 p-4">
      <div className="flex flex-row items-center justify-center mb-4 gap-4">
        <ThemeToggleButton />
        <h1 className="font-semibold text-2xl">{SAMPLE_DARK_NAME}</h1>
      </div>
      {isLoading ? (
        <div className="text-center leading-8">
          <div>예약 정보를 불러오는 중</div>
          <div>
            문의: <SMSLink>{SAMPLE_CS_PHONE}</SMSLink>
          </div>
        </div>
      ) : (
        <>{reservationArray && <ReservationTable reservationArray={reservationArray} />}</>
      )}
    </main>
  )
}

const ReservationTable = ({ reservationArray }: { reservationArray: Reservation[] }) => {
  function sortReservationArrayByTimestamp(a: Reservation, b: Reservation): number {
    if (a.timestamp < b.timestamp) return -1
    return 1
  }

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
        {reservationArray.sort(sortReservationArrayByTimestamp).map((info, idx) => {
          const { date, hour } = timestampToDate(info.timestamp)
          return (
            <TableRow key={`reservation-${idx}`}>
              <TableCell className="text-center">{date}</TableCell>
              <TableCell className="text-center">{hour}</TableCell>
              <TableCell className="text-center">
                {info.count}:{info.count}
              </TableCell>
              <TableCell className="text-center">
                <SMSLink>{changePhoneString(info.phone.male)}</SMSLink>
              </TableCell>
              <TableCell className="text-center">
                <SMSLink>{changePhoneString(info.phone.female)}</SMSLink>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

function changePhoneString(phone: string): string {
  if (phone.includes('_couple')) return phone.split('_couple')[0]
  if (phone.includes('blog')) return '블로그 체험단'
  if (phone.includes('_won')) return '커플 데이트'
  return phone
}
