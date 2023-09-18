import { DashboardNavBar as NavBar } from '@components/dashboard/nav-bar'
import { ThemeToggleButton } from '@components/theme-button'
import { getLogger } from '@libs/logger'
import { useDashboardStore } from '@libs/store'

export default function Dashboard() {
  const logger = getLogger()
  logger.log('Dashboard', `visit`)
  const key = useDashboardStore((state) => state.key)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-semibold text-2xl mb-4">Dashboard</h1>
      <ThemeToggleButton />
      <NavBar />
      <div>{key}</div>
    </main>
  )
}
