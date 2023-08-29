import { useEffect, useState, useRef } from 'react'
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { AnimatedLetters } from '../components/AnimatedLetters'
import "./index.module.scss"

export default function Map() {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [center, setCenter] = useState(undefined)
    const [zoom, setZoom] = useState(13)
    const [points, setPoints] = useState([])
    const form = useRef()
    const [selectedFile, setSelectedFile] = useState();
    const [isSelected, setIsSelected] = useState(false)
    const [isUploaded, setIsUploaded] = useState(false);
  
    const changeHandler = (event) => {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);
        
        fetch('http://localhost:5000/upload',
          {
            method: 'POST',
            body: formData,
          }
        )
          .then((response) => response.json())
          .then((result) => {
            setIsUploaded(true)
            console.log('Success:', result);
          })
    
          .catch((error) => {
            console.error('Error:', error);
          });
    };
    
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
        <div className='container gpx-page'>
         <div className="text-zone">
         <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"Work In Progress".split("")}
              idx={15}
            />
          </h1>
         <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={"Upload a gpx file".split("")}
              idx={15}
            />
          </h1>
          <p>When you add a gpx file the map and stats will update</p>
            <form ref={form} onSubmit={handleSubmission}  method="POST" encType="multipart/form-data">
                <input type="file" id="gpx" name="gpx" accept=".gpx" onChange={changeHandler}/>
                <input type="submit" className="flat-button" value="Upload" />
            </form>
         </div>
         <div className="map-wrap">
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
        </div>
   
        </>

    )
}
