export type Reservation = {
  type: number
  count: number
  phone: {
    male: string[]
    female: string[]
  }
  timestamp: number
}
