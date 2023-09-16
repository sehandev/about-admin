import { Fetcher } from 'swr'

import { Logger, getLogger } from './logger'

let swrManager: SWRManager

export class SWRManager {
  fetcher: Fetcher<any, string>
  logger: Logger

  constructor() {
    this.logger = getLogger()
    this.logger.log('SWRManager', 'constructor')
    this.fetcher = (...args) => fetch(...args).then((res) => res.json())
  }

  getFetcher() {
    this.logger.log('SWRManager', 'getFetcher')
    return this.fetcher
  }
}

export function getSWRManager(): SWRManager {
  if (swrManager) return swrManager
  return (swrManager = new SWRManager())
}
