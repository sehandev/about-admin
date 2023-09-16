import type { NextApiRequest, NextApiResponse } from 'next'

export type Article = {
  title: string
  date: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Article>) {
  res.status(200).json({
    title: 'Text article title',
    date: '2023-09-07',
  })
}
