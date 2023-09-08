import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
    }

    const bikeOnRideData = JSON.parse(req.body)
 
    const savedBikeOnRide = await prisma.bikeOnRide.create({
        data: bikeOnRideData,
    })


    return res.json(savedBikeOnRide)
}