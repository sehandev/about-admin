import useSWR from 'swr'

import { ReservationMain } from '@components/reservation/main'
import { getLogger } from '@libs/logger'
import { getSWRManager } from '@libs/swr'
import { Reservation } from '@type/reservation'

const SAMPLE_CS_PHONE: string = '010-5397-8929'
const SAMPLE_CAFE_NAME: string = 'CAFE_OGO'

export default function DarkReservation() {
  const logger = getLogger()
  const swrManager = getSWRManager()
  logger.log('CafeReservation', `visit`, { cafe_name: SAMPLE_CAFE_NAME })
  const { data: reservationArray, isLoading } = useSWR<Reservation[], Error>(
    swrManager.convertAPI(`/admin/reservation/cafe/${SAMPLE_CAFE_NAME}?offset=0&limit=100`),
    swrManager.getFetcher(),
  )

  return (
    <ReservationMain
      csPhone={SAMPLE_CS_PHONE}
      reservationArray={reservationArray}
      locationName={SAMPLE_CAFE_NAME}
      isLoading={isLoading}
    />
  )
}
