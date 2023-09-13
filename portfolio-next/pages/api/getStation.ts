import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from './db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query;
    const { stationNo  } = query;
    if( req.method !== 'GET'){
        return res.status(405).json({message: 'method not allowed'});
    }
    const station = await prisma.station.findFirst({where: {number: stationNo?.valueOf()} })

    return res.status(200).json({station})

}