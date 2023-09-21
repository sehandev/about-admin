export class CountByType {
  dark: number
  cafe: number

  constructor({ dark, cafe }: { dark?: number; cafe?: number }) {
    this.dark = dark ? dark : 0
    this.cafe = cafe ? cafe : 0
  }
}

export class DateCount {
  reservationCount: CountByType
  matchCount: CountByType

  constructor({ reservationCount, matchCount }: { reservationCount: CountByType; matchCount: CountByType }) {
    this.reservationCount = reservationCount
    this.matchCount = matchCount
  }
}

export class CountFilterDTO {
  tmp: string[]
  type: string[]

  constructor({ tmp, type }: { tmp: string[]; type: string[] }) {
    this.tmp = tmp
    this.type = type
  }
}

export enum CountTMPEnum {
  Reservation = 'reservationCount',
  Match = 'matchCount',
}

export enum CountTypeEnum {
  Dark = 'dark',
  Cafe = 'cafe',
}
