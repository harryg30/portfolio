'use client'

import { useState } from 'react'
import React from 'react'
import dynamic from 'next/dynamic'
import StationCard from '../components/StationCard'
import { Station } from '../../pages/api/db'
import { Card } from 'antd'
import YearCard from '../components/YearCard'

const MapWithStations = dynamic(() => import('../components/mapWithStations'), {
    ssr: false,
    loading: () => <div>loading...</div>,
})

const DEFAULT_CENTER = [42.3342, -71.1041]

export default function BlueBike(): JSX.Element {
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
                <div className="text-zone">
                    <div className="grid-container">
                        <div className="grid-item">
                            <p>BlueBike Data Visualization</p>
                        </div>
                        <div className="grid-item"></div>
                        <div className="grid-item">
                            {center != undefined ? (
                                <MapWithStations
                                    center={center}
                                    zoom={zoom}
                                    setSelectedStation={handleMarkerClick}
                                    selectedStation={selectedStation}
                                />
                            ) : (
                                <></>
                            )}
                        </div>

                        <div className="grid-item">
                            {selectedStation.number === 'undefined' ? (
                                <YearCard />
                            ) : (
                                <StationCard station={selectedStation} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
