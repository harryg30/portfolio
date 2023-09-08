import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'method not allowed' });
    }

    const bikeData = JSON.parse(req.body)

    const savedBike = await prisma.bike.create({
        data: bikeData,
    })

    
    return res.json(savedBike)



}