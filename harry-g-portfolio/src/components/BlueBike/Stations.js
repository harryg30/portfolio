import { useEffect, useState, useRef } from 'react'
import { CircleMarker, Marker, Popup } from 'react-leaflet'
import Papa from 'papaparse';
import stationsFile from '../../assets/data/current_bluebikes_stations.json'

const Stations = () => {


    const stations = useState(stationsFile)





    return (
        <>{
            stations.length === 0 || stations===undefined  ? <></> : stations[0].map(o => <CircleMarker center={[o.Latitude, o.Longitude]} key={o.id} />)
        }
        </>
        

    )
}

export default Stations;