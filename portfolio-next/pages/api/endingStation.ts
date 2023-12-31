import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from './db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
    }

    const endingStationData = JSON.parse(req.body)
 
    const savedEndingStation = await prisma.endingStation.create({
        data: endingStationData,
    })
    return res.json(savedEndingStation)
}