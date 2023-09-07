import { useEffect, useState, useRef } from 'react'
import React from 'react';
import rideFile from '../../assets/data/testRides.json'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function saveRide(station) {
    const response = await fetch('/api/ride', {
        method: 'POST',
        body: JSON.stringify(station)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function insertFile(){
    const rides = rideFile
    let member = false

    for(const r in rides){
        if( rides[r].subscriber == 'Subscriber'){
            member = true
        }
        const ride = {
            startTime: rides[r].startTime,
            endTime: rides[r].endTime,
            member: member
            
        }

        await saveRide()
    }
}

export default function insertStation() {
    const s = 0

    return (
        <>
            <div className='home-page'>
                <div className='text-zone'>
                    <h1>Inserted {s} stations</h1>
                    <button onClick={insertFile()}/>
                </div>
            </div>
        </>
    )
}