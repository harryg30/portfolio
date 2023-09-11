import { useState, useEffect } from 'react'
import React from 'react';
// import { CircleMarker, Marker, Popup } from 'react-leaflet'

const DynamicMap = dynamic(() => import('../Map/DynamicMap'), {
    ssr: false
  });


  const CircleMarker = dynamic(
    () => import('react-leaflet').then((m) => m.TileLayer),
    { ssr: false }
  );
  const Popup = dynamic(
    () => import('react-leaflet').then((m) => m.TileLayer),
    { ssr: false }
  );


const checkEnvironment = () => {
    let base_url =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://example.com"; // https://v2ds.netlify.app
  
    return base_url;
};


// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const MapWithStations = (props) => {
  const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
  const [stations, setStations] = useState([])
    
  useEffect( () =>{
      fetch(checkEnvironment().concat('/api/getStations'), { method: 'GET' }) 
      .then(resp => resp.json())
      .then(data => setStations(data.stations))
  }, [])



  return (
    <div style={{ aspectRatio: width / height }}>
      <DynamicMap {...props} >
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
      </DynamicMap>
    </div>
  )
}

export default MapWithStations;