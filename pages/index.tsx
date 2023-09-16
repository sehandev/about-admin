import useSWR from 'swr'

import { Article } from '@api/blog'
import { ThemeToggleButton } from '@components/theme-button'
import { getLogger } from '@libs/logger'
import { getSWRManager } from '@libs/swr'

export default function Home() {
  const logger = getLogger()
  const swrManager = getSWRManager()

  const { data, isLoading } = useSWR<Article, Error>('/api/blog', swrManager.getFetcher())

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="">{data?.title}</h1>
          <div>{data?.date}</div>
        </>
      )}
      <button
        className="btn btn-primary"
        onClick={() => {
          logger.log('Home', 'test', data)
        }}
      >
        테스트 버튼
      </button>
      <ThemeToggleButton />
    </main>
  )
}
