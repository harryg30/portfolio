'use client'

import { useState } from 'react'
import React from 'react'
import dynamic from 'next/dynamic'
import StationCard from '../components/StationCard'
import { Station } from '../../pages/api/db'
import { Button, Card } from 'antd'
import YearCard from '../components/YearCard'
import {
    TypedDocumentNode,
    gql,
    skipToken,
    useSuspenseQuery
} from '@apollo/client'

const MapWithStations = dynamic(() => import('../components/mapWithStations'), {
    ssr: false,
    loading: () => <div>loading...</div>
})

const DEFAULT_CENTER = [42.3342, -71.1041]

type trip = {
    [x: string]: any
    latitude: string
    longitude: string
    name: string
    number: string
    count: number
}
type Data = {
    [x: string]: any
    destinations_by_station_pairs_with_end_lat_lon_view: trip
}
type Vars = {
    _eq: String
}

const STATION_TRIP_COUNT_QUERY: TypedDocumentNode<Data, Vars> = gql`
    query stationTripCount($_eq: String) {
        destinations_by_station_pairs_with_end_lat_lon_view(
            where: { startStationNumber: { _eq: $_eq } }
        ) {
            latitude: end_station_latitude
            longitude: end_station_longitude
            name: end_station_name
            number: endStationNumber
            count: total_count
        }
    }
`
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
        deploymentYear: 0
    } as Station)

    const { data: stationTripCount } = useSuspenseQuery(
        STATION_TRIP_COUNT_QUERY,
        selectedStation.number
            ? { variables: { _eq: selectedStation.number } }
            : skipToken
    )
    const trips: trip | undefined =
        stationTripCount?.destinations_by_station_pairs_with_end_lat_lon_view

    function handleMarkerClick(e: Station) {
        setSelectedStation(e)
    }
    function clearStation() {
        setSelectedStation({
            id: -1,
            number: 'undefined',
            name: 'undefined',
            latitude: 0,
            longitude: 0,
            district: 'undefined',
            public: false,
            totalDocks: 0,
            deploymentYear: 0
        } as Station)
    }
    return (
        <>
            <div className="container bluebike-page">
                <div className="text-zone">
                    <div className="grid-container">
                        <div className="grid-item">
                            <p>BlueBike Data Visualization</p>
                        </div>
                        <div className="grid-item">
                            {selectedStation.number === 'undefined' ? (
                                <></>
                            ) : (
                                <Button onClick={() => clearStation()}>
                                    Clear Selected Station
                                </Button>
                            )}
                        </div>
                        <div className="grid-item">
                            {center != undefined ? (
                                <MapWithStations
                                    center={center}
                                    zoom={zoom}
                                    trips={trips}
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
