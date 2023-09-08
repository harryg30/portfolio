import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
    }

    const rideData = JSON.parse(req.body)

    try {
        const savedRide = await prisma.ride.create({
            data: rideData,
        })

        return res.json(savedRide)
    } catch (error) {
        console.log(error)
        return res.status(500)
    }


}