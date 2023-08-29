import { useEffect, useState, useRef } from 'react'
import React from 'react';
import 'leaflet/dist/leaflet.css'
import "./index.module.scss"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("./map"), { ssr:false })

export default function BlueBike()  {
    const [center, setCenter] = useState([42.3342, -71.1041])
    const [zoom, setZoom] = useState(13)

    return (
        <>
            <div className='container bluebike-page'>
                <div className='text-zone'>
                    <h1>BlueBike rider data</h1>
                </div>
                <div  className='map-wrap'>
                    {center != undefined ? <Map center={center}/>
                        : <></>}
                </div>
            </div>
        </>
    )
}
