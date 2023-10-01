'use client'

import { Tabs, TabsList, TabsTrigger } from '@components/ui/tabs'
import { useDashboardStore } from '@libs/store'

enum NavEnum {
  DarkMeeting = '암흑 미팅',
  DarkDate = '암흑 데이트',
  CafeMeeting = '카페 미팅',
  BeerMeeting = '맥주 미팅',
}

export function DashboardNavBar() {
  const NavEnumKeys = Object.keys(NavEnum) as (keyof typeof NavEnum)[]

  return (
    <Tabs defaultValue={'DarkMeeting'}>
      <TabsList>
        {NavEnumKeys.map((navKey, idx) => {
          return (
            <TabsTrigger value={navKey} key={`nav-${idx}`} onClick={() => useDashboardStore.setState({ key: navKey })}>
              {NavEnum[navKey]}
            </TabsTrigger>
          )
        })}
      </TabsList>
    </Tabs>
  )
}
