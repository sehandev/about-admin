import { ReactNode } from 'react'

import { SMSLink } from '@components/link'

interface LoadingType {
  csPhone: string
}
export function Loading({ csPhone }: LoadingType): ReactNode {
  return (
    <div className="text-center leading-8">
      <div>예약 정보를 불러오는 중</div>
      <div>
        문의: <SMSLink>{csPhone}</SMSLink>
      </div>
    </div>
  )
}
