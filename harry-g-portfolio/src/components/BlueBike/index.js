import { useEffect, useState, useRef } from 'react'
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const BlueBike = () => {
    const [center, setCenter] = useState(undefined)
    const [zoom, setZoom] = useState(13)

    return(
        <>
         <div className="map-wrap">
            {center != undefined ? <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            
                </MapContainer>
            :<></>}
            </div>
        </>
    )
}

export default BlueBike;