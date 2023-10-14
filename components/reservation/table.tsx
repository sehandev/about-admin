import { ReactNode } from 'react'

import { SMSLink } from '@components/link'
import { TableCell, TableHead, TableRow } from '@components/ui/table'
import { timestampToDate } from '@libs/timestamp'
import { Reservation } from '@type/reservation'

export function ReservationTableHeaderRow() {
  return (
    <TableRow>
      <TableHead className="text-center">날짜</TableHead>
      <TableHead className="text-center">시간</TableHead>
      <TableHead className="text-center">인원</TableHead>
      <TableHead className="text-center">남성</TableHead>
      <TableHead className="text-center">여성</TableHead>
    </TableRow>
  )
}

interface ReservationTableRowType {
  info: Reservation
}
export function ReservationTableRow({ info }: ReservationTableRowType): ReactNode {
  const { date, hour } = timestampToDate(info.timestamp)
  return (
    <TableRow>
      <TableCell className="text-center">{date}</TableCell>
      <TableCell className="text-center">{hour}</TableCell>
      <TableCell className="text-center">
        {info.count}:{info.count}
      </TableCell>
      <TableCell className="text-center">
        {info.phone.male.map((phone, idx) => (
          <>
            <SMSLink key={`male-sms-link-${idx}`}>{changePhoneString(phone)}</SMSLink>
            <br />
          </>
        ))}
      </TableCell>
      <TableCell className="text-center">
        {info.phone.female.map((phone, idx) => (
          <>
            <SMSLink key={`female-sms-link-${idx}`}>{changePhoneString(phone)}</SMSLink>
            <br />
          </>
        ))}
      </TableCell>
    </TableRow>
  )
}

function changePhoneString(phone: string): string {
  if (phone.includes('_couple')) return phone.split('_couple')[0]
  if (phone.includes('blog')) return '블로그 체험단'
  if (phone.includes('_won')) return '커플 데이트'
  return phone
}
