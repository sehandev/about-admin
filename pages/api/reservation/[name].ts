import type { NextApiRequest, NextApiResponse } from 'next'

export type Reservation = {
  count: number
  phone: {
    male: string
    female: string
  }
  timestamp: number
}

export default function reservationHandler(req: NextApiRequest, res: NextApiResponse<Reservation[]>) {
  const { name } = req.query

  if (!name) {
    res.status(404)
  }

  res.status(200).json([
    {
      count: 1,
      phone: {
        male: '010-1234-1234',
        female: '010-5678-5678',
      },
      timestamp: 1694851200,
    },
    {
      count: 2,
      phone: {
        male: '010-1111-1111',
        female: '010-2222-2222',
      },
      timestamp: 1694851800,
    },
    {
      count: 2,
      phone: {
        male: '010-3333-3333',
        female: '010-4444-4444',
      },
      timestamp: 1694851800,
    },
  ])
}
