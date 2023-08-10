import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const Map = () => {
    const [center, setCenter] = useState(undefined)
    const [zoom, setZoom] = useState(13)
    const [points, setPoints] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/points')
       .then(res => res.json())
       .then(resp => setPoints(resp))
   },[])

    useEffect(() => {
         fetch('http://localhost:5000/startPoint')
        .then(res => res.json())
        .then(resp => setCenter(resp))
    }, [])

    return(
        <>
            <div className="container home-page">
            {center != undefined ? <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                    { points.length === 0 ? 
                    <></>
                    :points.map(o => <CircleMarker center={[o.lat, o.lon]} key={o.id}/>) }
                </MapContainer>
            :<></>}
            </div>
        </>

    )
}

export default Map;