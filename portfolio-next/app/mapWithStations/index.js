import { useState, useEffect } from 'react'
import React from 'react';
import { CircleMarker, Popup, TileLayer } from 'react-leaflet'
import DynamicMap from '../Map/DynamicMap'

const checkEnvironment = () => {
  let base_url =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://www.hgordenstein.com:3000"; // https://v2ds.netlify.app

  return base_url;
};


// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const MapWithStations = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  const [stations, setStations] = useState([])

  useEffect(() => {
    fetch(checkEnvironment().concat('/api/getStations'), { method: 'GET' })
      .then(resp => resp.json())
      .then(data => setStations(data.stations))
  }, [])



  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} >
        <>
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
              {
                stations.length === 0 || stations === undefined
                  ? <></>
                  :
                  stations.map(o =>
                    <CircleMarker center={[o.latitude, o.longitude]} key={o.id} radius={5}>
                      <Popup content={o.name} />
                    </CircleMarker>
                  )
              }
            </>
        </>
      </DynamicMap>
    </div>
  )
}

export default MapWithStations;