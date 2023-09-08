import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet'
import Stations from './Stations'

export default function Map(props) {

    return (
        <>        
            <MapContainer center={props.center} zoom={12}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Stations />
            </MapContainer>
        </>

    )
}