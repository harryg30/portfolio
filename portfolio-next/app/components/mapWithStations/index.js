import { useState, useEffect, useRef } from 'react'
import React from 'react';
import Map from '../Map/DynamicMap'
import Link from 'next/link';

const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://www.hgordenstein.com"; 

  return base_url;
};


// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const MapWithStations = (props) => {
  const [stations, setStations] = useState([])

  useEffect(() => {
    fetch(checkEnvironment().concat('/api/getStations'), { method: 'GET' })
      .then(resp => resp.json())
      .then(data => setStations(data.stations))
  }, [])

  return (
    <div className='map-wrap'>
      <Map center={props.center} zoom={props.zoom} height={props.height} width={props.width} >
        {({ TileLayer, CircleMarker, Popup }) => (
          <>      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
              stations.length === 0 || stations === undefined
                ? <></>
                : stations.map(o =>
                  <CircleMarker center={[o.latitude, o.longitude]} key={o.id} radius={5}>
                    <Popup>
                      <Link href={'/station/'+o.number}>{o.name}</Link>
                    </Popup>
                  </CircleMarker>
                )
            }
          </>

        )}
      </Map>

    </div>
  )
}

export default MapWithStations;