import { useEffect, useState, useRef } from 'react'
import React from 'react';
import dynamic from 'next/dynamic';
// import MapWithStations from '../../app/mapWithStations';

const MapWithStations = dynamic(
    () => import('../../app/mapWithStations'),
    {
        ssr: false,
        loading: () => (<div>loading...</div>),
    }
);

const DEFAULT_CENTER = [42.3342, -71.1041]

export default function BlueBike() {
    const [center, setCenter] = useState(DEFAULT_CENTER)
    const [zoom, setZoom] = useState(12)

    return (
        <>
            <div className='container bluebike-page'>
                <div className='text-zone'>
                    <h1>BlueBike rider data</h1>
                </div>
                <div className='map-wrap'>
                    {center != undefined ?
                        <MapWithStations width="800" height="400" center={center} zoom={zoom} />
                        : <></>}
                </div>
            </div>
        </>
    )
}
