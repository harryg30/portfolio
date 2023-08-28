import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Stations from './Stations'
import './index.module.scss'

const BlueBike = () => {
    const [center, setCenter] = useState([42.3342, -71.1041])
    const [zoom, setZoom] = useState(13)

    return (
        <>
            <div className='container bluebike-page'>
                <div className='text-zone'>
                    <h1>BlueBike rider data</h1>
                </div>
                <div  className='map-wrap'>
                    {center != undefined ? <MapContainer center={center} zoom={12}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Stations/>
                    </MapContainer>
                        : <></>}
                </div>
            </div>
        </>
    )
}

export default BlueBike;