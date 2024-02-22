import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from './db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if( req.method !== 'GET'){
        return res.status(405).json({message: 'method not allowed'});
    }
    const bike = await prisma.bike.findMany()

    if(bike.length === 0){
        return res.status(501).json({message: 'No Stations'})
    }

    return res.status(200).json({bike})
}