import { useEffect, useState, useRef } from 'react'
import React from 'react';
import 'leaflet/dist/leaflet.css'
import "./index.module.scss"
import { TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet'
import Stations from './Stations';
import Map from '../../components/Map'

const DEFAULT_CENTER = [42.3342, -71.1041]

export default function BlueBike() {
    const [center, setCenter] = useState(DEFAULT_CENTER)
    const [zoom, setZoom] = useState(13)

    return (
        <>
            <div className='container bluebike-page'>
                <div className='text-zone'>
                    <h1>BlueBike rider data</h1>
                </div>
                <div className='map-wrap'>
                    {center != undefined ?
                        <Map  width="800" height="400" center={center} zoom={12}>
                            {({ TileLayer, Marker, Popup }) => (
                                <>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                    />
                                    <Stations/>
                                </>
                            )}
                        </Map>
                        : <></>}
                </div>
            </div>
        </>
    )
}
