import { useState, useEffect } from 'react'
import React from 'react';
import { CircleMarker, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';

const checkEnvironment = () => {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://example.com"; // https://v2ds.netlify.app
  
    return base_url;
};

export default function Stations() {
    const [stations, setStations] = useState([])
    
    useEffect( () =>{
        fetch(checkEnvironment().concat('/api/getStations'), { method: 'GET' }) 
        .then(resp => resp.json())
        .then(data => setStations(data.stations))
    }, [])

    return (
        <>{
            stations.length === 0 || stations === undefined
                ? <></>
                : stations.map(o =>
                    <CircleMarker center={[o.latitude, o.longitude]} key={o.id} radius={5}>
                        <Popup content={o.name} />
                    </CircleMarker>
                )
        }
        </>
    )
}
