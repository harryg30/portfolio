import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from './db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query;
    const { stations } = query;
    if( req.method !== 'GET'){
        return res.status(405).json({message: 'method not allowed'});
    }
    const station = await prisma.station.findMany({where: {number: {in: String(stations?.valueOf()).split(",")}}})

    return res.status(200).json({station})

}