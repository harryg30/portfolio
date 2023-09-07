import type {NextApiRequest, NextApiResponse} from 'next';
import { PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if( req.method !== 'POST'){
        return res.status(405).json({message: 'method not allowed'});
    }

    const stationData =JSON.parse(req.body)
    
    const sExists = await prisma.station.findFirst({
        where: { number: stationData.number },
    })

    if(sExists === null){
        console.log(sExists)
        const savedStation = await prisma.station.create({
            data: stationData,
        })
        return res.json(savedStation)
    }else{
      console.log("station already inserted")
      return res.status(403).json({message: 'record exits'});
    }



}