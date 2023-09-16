import { ThemeToggleButton } from '@components/theme-button'
import { getLogger } from '@libs/logger'

export default function Home() {
  const logger = getLogger()
  logger.log('Home', `visit`)

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="font-semibold text-2xl mb-4">어바웃미팅 관리</h1>
      <ThemeToggleButton />
    </main>
  )
}
