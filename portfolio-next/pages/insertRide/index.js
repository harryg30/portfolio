import { useEffect, useState, useRef } from 'react'
import React from 'react';
import rideFile from '../../assets/data/testRides.json'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function saveRide(ride) {
    const response = await fetch('/api/ride', {
        method: 'POST',
        body: JSON.stringify(ride)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveBike(bike) {
    const response = await fetch('/api/bike', {
        method: 'POST',
        body: JSON.stringify(bike)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveBikeOnRide(bikeOnRide) {
    const response = await fetch('/api/bikeOnRide', {
        method: 'POST',
        body: JSON.stringify(bikeOnRide)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveStartingStation(startingStation) {
    const response = await fetch('/api/StartingStation', {
        method: 'POST',
        body: JSON.stringify(startingStation)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function saveEndingStation(endingStation) {
    const response = await fetch('/api/EndingStation', {
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
        let rideId = null
        let bikeObj = {
            bikeId: parseInt(rides[r].bikeid)
        }
        let bikeId = null
        
        try{
            await saveRide(rideObj)
            rideId = prisma.ride.findFirst({ where:{ startTime: rideObj.startTime }})
        }catch (error){
            console.error(error)
        }

        try{
            await saveBike(bikeObj)
            bikeId = prisma.bike.findFirst({ where:{ bikeid: bikeObj.bikeId }})
        }catch (error){
            console.error(error)
        }

        const bikeOnRideObj = {
            rideId: rideId,
            bikeId: bikeId
        }
        const startingStationObj = {
            stationId: prisma.station.findFirst({where:{name: rides[r].start_station_name}, select: id}),
            rideId: rideId
        }
        const endingStationObj = {
            stationId: prisma.station.findFirst({where:{name: rides[r].end_station_name}, select: id}),
            rideId: rideId
        }

        try{
            await saveBikeOnRide(bikeOnRideObj)
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
                    <button onClick={ insertFile()}/>
                </div>
            </div>
        </>
    )
}