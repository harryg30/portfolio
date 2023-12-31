import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
    }

    const stationData = req.body
    const savedStation = await prisma.station.createMany({
        data: stationData,
    })
    return res.json(savedStation)

}