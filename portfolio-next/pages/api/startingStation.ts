import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
    }

    const startingStationData = JSON.parse(req.body)
 
    const savedStartingStation = await prisma.startingStation.create({
        data: startingStationData,
    })
    return res.json(savedStartingStation)
}