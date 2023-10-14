import { Loading } from '@components/reservation/loading'
import { ReservationTable } from '@components/reservation/table'
import { ThemeToggleButton } from '@components/theme-button'
import { Reservation } from '@type/reservation'

interface ReservationMainType {
  reservationArray: Reservation[] | undefined
  csPhone: string
  locationName: string
  isLoading: boolean
}
export function ReservationMain({ reservationArray, csPhone, locationName, isLoading }: ReservationMainType) {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen sm:p-24 p-4">
      <div className="flex flex-row items-center justify-center mb-4 gap-4">
        <ThemeToggleButton />
        <h1 className="font-semibold text-2xl">{locationName}</h1>
      </div>
      {isLoading ? (
        <Loading csPhone={csPhone} />
      ) : reservationArray ? (
        <ReservationTable csPhone={csPhone} reservationArray={reservationArray} />
      ) : (
        // TODO: Error check
        <Loading csPhone={csPhone} />
      )}
    </main>
  )
}
