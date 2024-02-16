'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import React from 'react'
import dynamic from 'next/dynamic'
import StationCard from '../components/StationCard'
import { Station } from '../../pages/api/db'

const MapWithStations = dynamic(() => import('../components/mapWithStations'), {
    ssr: false,
    loading: () => <div>loading...</div>,
})

const DEFAULT_CENTER = [42.3342, -71.1041]

export default function BlueBike({ station }): JSX.Element {
    const center = DEFAULT_CENTER
    const zoom = 12
    const [selectedStation, setSelectedStation] = useState({
        id: -1,
        number: 'undefined',
        name: 'undefined',
        latitude: 0,
        longitude: 0,
        district: 'undefined',
        public: false,
        totalDocks: 0,
        deploymentYear: 0,
    } as Station)

    function handleMarkerClick(e: Station) {
        setSelectedStation(e)
    }

    return (
        <>
            <div className="container bluebike-page">
                <div>
                    <div className="text-zone">
                        <p>BlueBike Data Visualization</p>
                        <p>{selectedStation.number}</p>
                        {/* {selectedStation === undefined ? (
                           
                        ) : (
                            <StationCard station={selectedStation} />
                        )} */}
                    </div>
                    {center != undefined ? (
                        <MapWithStations
                            center={center}
                            zoom={zoom}
                            setSelectedStation={handleMarkerClick}
                        />
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    )
}
