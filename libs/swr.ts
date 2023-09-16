import { Fetcher } from 'swr'

import { Logger, getLogger } from './logger'

let swrManager: SWRManager

export class SWRManager {
  fetcher: Fetcher<any, string>
  logger: Logger
  externURI: string

  constructor() {
    this.logger = getLogger()
    this.logger.log('SWRManager', 'constructor')
    this.fetcher = (...args) => fetch(...args).then((res) => res.json())
    this.externURI = 'http://admin-api.aboutmeeting.co.kr'
  }

  log(message: string, data?: any): void {
    this.logger.log('SWRManager', message, data)
  }

  getFetcher() {
    this.log('getFetcher')
    return this.fetcher
  }

  convertAPI(uri: string): string {
    this.log('convertAPI', uri)
    if (uri.charAt(0) === '/') {
      uri = uri.slice(1)
    }
    return `${this.externURI}/${uri}`
  }
}

export function getSWRManager(): SWRManager {
  if (swrManager) return swrManager
  return (swrManager = new SWRManager())
}
