import { useState, useEffect, useRef } from 'react'
import React from 'react';
import Map from '../Map/DynamicMap'
import Link from 'next/link';
import checkEnvironment from '../../../components/checkEnv';


// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const MapWithStations = (props) => {
  const [stations, setStations] = useState([])

  useEffect(() => {
    fetch(checkEnvironment().concat('/api/getAllStations'), { method: 'GET' })
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