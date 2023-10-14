import { ReactNode } from 'react'

import { SMSLink } from '@components/link'

interface LoadingType {
  cs_phone: string
}
export function Loading({ cs_phone }: LoadingType): ReactNode {
  return (
    <div className="text-center leading-8">
      <div>예약 정보를 불러오는 중</div>
      <div>
        문의: <SMSLink>{cs_phone}</SMSLink>
      </div>
    </div>
  )
}
