import useSWR from 'swr'

import { SMSLink } from '@components/link'
import { Loading } from '@components/reservation/loading'
import { ReservationTableHeaderRow, ReservationTableRow } from '@components/reservation/table'
import { ThemeToggleButton } from '@components/theme-button'
import { Table, TableBody, TableCaption, TableHeader } from '@components/ui/table'
import { getLogger } from '@libs/logger'
import { getSWRManager } from '@libs/swr'
import { Reservation } from '@type/reservation'

const SAMPLE_CS_PHONE: string = '010-5140-7750'
const SAMPLE_DARK_NAME: string = 'SEOULUNIV_ABOUTMEETING'

export default function DarkReservation() {
  const logger = getLogger()
  const swrManager = getSWRManager()
  logger.log('DarkReservation', `visit`, { store_name: SAMPLE_DARK_NAME })
  const { data: reservationArray, isLoading } = useSWR<Reservation[], Error>(
    swrManager.convertAPI(`/admin/reservation/dark/${SAMPLE_DARK_NAME}?offset=0&limit=100`),
    swrManager.getFetcher(),
  )

  return (
    <main className="flex flex-col items-center justify-start min-h-screen sm:p-24 p-4">
      <div className="flex flex-row items-center justify-center mb-4 gap-4">
        <ThemeToggleButton />
        <h1 className="font-semibold text-2xl">{SAMPLE_DARK_NAME}</h1>
      </div>
      {isLoading ? (
        <Loading cs_phone={SAMPLE_CS_PHONE} />
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
        <ReservationTableHeaderRow />
      </TableHeader>
      <TableBody>
        {reservationArray.sort(sortReservationArrayByTimestamp).map((info, idx) => {
          return <ReservationTableRow key={`reservation-${idx}`} info={info} />
        })}
      </TableBody>
    </Table>
  )
}
