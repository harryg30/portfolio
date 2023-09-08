import { useEffect, useState, useRef } from 'react'
import React from 'react';
import rideFile from '../../assets/data/202212-bluebikes-tripdata.json'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const checkEnvironment = () => {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://example.com"; // https://v2ds.netlify.app
  
    return base_url;
  };

async function saveRide(ride) {
    const response = await fetch(checkEnvironment().concat('/api/ride'), {
        method: 'POST',
        body: JSON.stringify(ride)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveBike(bike) {
    const response = await fetch(checkEnvironment().concat('/api/bike'), {
        method: 'POST',
        body: JSON.stringify(bike)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveBikeOnRide(bikeOnRide) {
    const response = await fetch(checkEnvironment().concat('/api/bikeOnRide'), {
        method: 'POST',
        body: JSON.stringify(bikeOnRide)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveStartingStation(startingStation) {
    const response = await fetch(checkEnvironment().concat('/api/startingStation'), {
        method: 'POST',
        body: JSON.stringify(startingStation)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveEndingStation(endingStation) {
    const response = await fetch(checkEnvironment().concat('/api/endingStation'), {
        method: 'POST',
        body: JSON.stringify(endingStation)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function insertFile(){
    const rides = rideFile

    for(const r in rides){
        let rideObj = {
            startTime: rides[r].startTime,
            endTime: rides[r].endedTime, 
            member: true
        }
        let rideRes =null
        let bikeObj = {
            bikeId: parseInt(rides[r].bikeid)
        }
        let bikeRes = null
        try{

            if(await prisma.ride.findFirst({where:{startTime: rideObj.startTime}}) == null || await prisma.ride.count() == 0 ){
                await saveRide(rideObj)
            }
            rideRes = await prisma.ride.findFirst({ where:{ startTime: rideObj.startTime }, select:{id: true}})
        }catch (error){
            console.error(error)
        }

        try{
            if(await prisma.bike.findFirst({where:{bikeId: bikeObj.bikeId}}) == null || await prisma.bike.count() == 0 ){
                await saveBike(bikeObj)
            }
            bikeRes = await prisma.bike.findFirst({ where:{ bikeId: bikeObj.bikeId }, select:{id: true}})
        }catch (error){
            console.error(error)
        }

        const bikeOnRideObj = {
            ride: { 
                connect: rideRes
            },
            bike:  { 
                connect: bikeRes
            }
        }

        const startS =  await prisma.station.findFirst({where:{name: rides[r].start_station_name}, select: {id: true}})
        const endS =  await prisma.station.findFirst({where:{name: rides[r].end_station_name}, select: {id: true}})
        const startingStationObj = {
            station: {connect: startS},
            ride: { connect: rideRes }
        }
        const endingStationObj = {
            station: {connect: endS},
            ride: { connect: rideRes }
        }
        try{
            if(rideRes!= null && bikeRes != null){
                await saveBikeOnRide(bikeOnRideObj)
            }
        }catch (error){
            console.error(error)
        }

        try{
            await saveStartingStation(startingStationObj)
        }catch (error){
            console.error(error)
        }
        try{
            await saveEndingStation(endingStationObj)
        }catch (error){
            console.error(error)
        }


    }
}

export default function insertStation() {
    const s = 0

    return (
        <>
            <div className='home-page'>
                <div className='text-zone'>
                    <h1>Inserting stations</h1>
                    {/* <button onClick={ insertFile()}/> */}
                </div>
            </div>
        </>
    )
}