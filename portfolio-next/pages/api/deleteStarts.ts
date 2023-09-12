import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'method not allowed' });
    }

   
 
    const savedBikeOnRide = await prisma.startingStation.deleteMany({})


    return res.json(savedBikeOnRide)
}