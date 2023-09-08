import { useState } from 'react'
import React from 'react';
import { CircleMarker, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export default async function Stations() {
    const stations = await prisma.stations.findMany()
    console.log(stations)
    return (
        <>{
            stations.length === 0 || stations === undefined
                ? <></>
                : stations[0].map(o =>
                    <CircleMarker center={[o.latitude, o.longitude]} key={o.id} radius={5}>
                        <Popup content={o.name} />
                    </CircleMarker>
                )
        }
        </>


    )
}
