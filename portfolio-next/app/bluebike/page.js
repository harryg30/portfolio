"use client";

import { useEffect, useState, useRef } from 'react'
import React from 'react';
import dynamic from 'next/dynamic';


const MapWithStations = dynamic(
    () => import('../components/mapWithStations'),
    {
        ssr: false,
        loading: () => (<div>loading...</div>),
    }
);

const DEFAULT_CENTER = [42.3342, -71.1041]

export default function BlueBike(props) {
    const [center, setCenter] = useState(DEFAULT_CENTER)
    const [zoom, setZoom] = useState(12)

    return (
        <>
            <div className='container bluebike-page'>
                <div className='text-zone'>
                    <p>BlueBike Data Visualization</p>
                    <p>Click on a station to see the top 3 destinations in black and top 3 origins in red or click the link in the pop up for more information</p>
                </div>
                <div>
                    {center != undefined ?
                        <MapWithStations center={center} zoom={zoom} props={props}/>
                        : <></>}
                </div>
            </div>
        </>
    )
}
