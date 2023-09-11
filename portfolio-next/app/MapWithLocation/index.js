import { useState, useEffect } from 'react'
import React from 'react';
import { TileLayer, Marker, Popup } from 'react-leaflet'
import DynamicMap from '../Map/DynamicMap'

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;
const DEFAULT_CENTER = [42.3342, -71.1041]


const MapWithLocation = (props) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
    return (
        <div style='map-wrap'>
            <DynamicMap center={DEFAULT_CENTER} zoom={12}>
                <>
                    {({ TileLayer, Marker, Popup }) => (
                        <>
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                            />
                            <Marker position={[42.3132, -71.1141]}>
                                <Popup>Harry lives here, come over for a bike ride</Popup>
                            </Marker>
                        </>
                    )}
                </>
            </DynamicMap>
        </div>
    )
}

export default MapWithLocation;