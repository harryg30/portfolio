import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if( req.method !== 'GET'){
        return res.status(405).json({message: 'method not allowed'});
    }
    const rides = await prisma.ride.findMany({where: {startingStation: }})

    if(rides.length === 0){
        return res.status(501).json({message: 'No Stations'})
    }

    return res.status(200).json({rides})

}