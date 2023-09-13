import type {NextApiRequest, NextApiResponse} from 'next';
import prisma from '../db' 

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const query = req.query;
    const { stationNo  } = query;
    if( req.method !== 'GET' ){
        return res.status(405).json({message: 'method not allowed'});
    }else{
        const stationId = await prisma.station.findFirst({where: {number: stationNo?.valueOf()}, select:{id:true} })
        const rideRelation = await prisma.startingStation.findMany({where: {stationId: stationId?.id}, select:{ rideId: true}})
        const rides = await prisma.ride.findMany({where: {id: {in: rideRelation.map((r) => r.rideId)}}, include: {startingStation:{where:{stationId: stationId?.id}, select:{station:true}}, endingStation:{select:{station:true}}}})

    if(rides.length === 0){
        return res.status(501).json({message: 'No Stations'})
    }

    return res.status(200).json({rides})
    }


}