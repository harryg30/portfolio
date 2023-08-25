import { useState } from 'react'
import { CircleMarker, Marker, Popup } from 'react-leaflet'
import stationsFile from '../../assets/data/current_bluebikes_stations.json'
import L from 'leaflet';


const Stations = () => {
    const stations = useState(stationsFile)

    return (
        <>{
            stations.length === 0 || stations===undefined  
            ? <></> 
            : stations[0].map(o => 
                <CircleMarker center={[o.Latitude, o.Longitude]} key={o.id} radius={5}>
                    <Popup content={o.Name}/>
                </CircleMarker>
            )
        }
        </>
        

    )
}

export default Stations;