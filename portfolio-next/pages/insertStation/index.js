import { useEffect, useState, useRef } from 'react'
import React from 'react';
import stationFile from '../../assets/data/current_bluebikes_stations.json'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function saveStation(station) {
    const response = await fetch('/api/station', {
        method: 'POST',
        body: JSON.stringify(station)
    });

    if (!response.ok) {
        throw new Error(response.status)
    }

    return await response.json();
}

async function insertFile(){
    const stations = stationFile
    let member = false

    for(const s in stations){
        await saveStation(stations[s])
    }
}

export default function insertStation() {


    return (
        <>
            <div className='home-page'>
                <div className='text-zone'>
                    <h1>Inserting stations</h1>
                    {/* <button onClick={insertFile()}/> */}
                </div>
            </div>
        </>
    )
}