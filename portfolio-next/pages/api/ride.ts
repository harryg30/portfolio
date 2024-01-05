import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "./db";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const rideData = req.body;
  const savedRideList: any[] = [];
  for (const ride in rideData) {
    let isMember = true;
    if (rideData[ride].usertype != "Subscriber") {
      isMember = false;
    }
    const start = new Date(rideData[ride].startTime);
    const end = new Date(rideData[ride].endedTime);

    let bikeId = parseInt(rideData[ride].bikeid);
    if (bikeId == undefined || Number.isNaN(bikeId)) {
      bikeId = 999999;
    }

    const rideObj = {
      startTime: start,
      endTime: end,
      member: isMember,
      bike: {
        connectOrCreate: {
          where: { bikeId: bikeId },
          create: { bikeId: bikeId },
        },
      },
    };

    try {
      const exists = await prisma.ride.findFirst({
        where: { startTime: start },
      });
      if (exists == null) {
        const savedRide = await prisma.ride.create({
          data: rideObj,
        });

        savedRideList.push(savedRide);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }

    const rideRes = await prisma.ride.findFirst({
      where: { startTime: start },
      select: { id: true },
    });
    const startS = await prisma.station.findFirst({
      where: { name: rideData[ride].start_station_name },
      select: { id: true },
    });
    const endS = await prisma.station.findFirst({
      where: { name: rideData[ride].end_station_name },
      select: { id: true },
    });

    if (rideRes == null || startS == null || endS == null) {
      //dont
    } else {
      const startingStationObj = {
        station: { connect: startS },
        ride: { connect: rideRes },
      };
      const endingStationObj = {
        station: { connect: endS },
        ride: { connect: rideRes },
      };
      const savedStartingStation = await prisma.startingStation.create({
        data: startingStationObj,
      });
      const savedEndingStation = await prisma.endingStation.create({
        data: endingStationObj,
      });
      savedRideList.push(savedStartingStation);
      savedRideList.push(savedEndingStation);
    }
  }

  return res.json(savedRideList);
};
