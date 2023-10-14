import useSWR from 'swr'

import { ReservationMain } from '@components/reservation/main'
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
    <ReservationMain
      csPhone={SAMPLE_CS_PHONE}
      reservationArray={reservationArray}
      locationName={SAMPLE_DARK_NAME}
      isLoading={isLoading}
    />
  )
}
