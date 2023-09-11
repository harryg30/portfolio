import { useState, useEffect } from 'react'
import React from 'react';
import {TileLayer,  Marker, Popup } from 'react-leaflet'
import DynamicMap from '../Map/DynamicMap'
// const DynamicMap = dynamic(() => import('../Map/DynamicMap'), {
//     ssr: false
//   });


// const TileLayer = dynamic(
//     () => import('react-leaflet').then((m) => m.TileLayer),
//     { ssr: false }
//   );

//   const Marker = dynamic(
//     () => import('react-leaflet').then((m) => m.TileLayer),
//     { ssr: false }
//   );
//   const Popup = dynamic(
//     () => import('react-leaflet').then((m) => m.TileLayer),
//     { ssr: false }
//   );


const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const MapWithLocation = (props) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
    return (
        <div style={{ aspectRatio: width / height }}>
            <DynamicMap width="800" height="400" center={DEFAULT_CENTER} zoom={12}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[42.3132, -71.1141]}>
                    <Popup>Harry lives here, come over for a bike ride</Popup>
                </Marker>
            </DynamicMap>
        </div>
    )
}

export default MapWithLocation;