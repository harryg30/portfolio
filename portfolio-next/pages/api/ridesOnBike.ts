import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from './db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query;
    const { bikeId  } = query;
    if( req.method !== 'GET' ){
        return res.status(405).json({message: 'method not allowed'});
    }else{
        const rides = await prisma.ride.findMany(
            {where: {bikeId: parseInt(bikeId?.valueOf() as string) }, 
            include: {startingStation:{select:{station:true}}, 
                    endingStation:{select:{station:true}}}, 
            orderBy:{startTime: 'asc'}})

    if(rides.length === 0){
        return res.status(501).json({message: 'No Stations'})
    }

    return res.status(200).json({rides})
    }


}