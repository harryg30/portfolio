import { memo, useEffect, useState } from 'react'
import React from 'react'
import Map from '../Map/DynamicMap'
import Link from 'next/link'
import { Station } from '../../../pages/api/db'
import { gql, skipToken, TypedDocumentNode } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

type trip = {
    [x: string]: any
    latitude: String
    longitude: String
    name: String
    number: string
    count: number
}
interface StationData {
    Station: Station
}
const GET_STATIONS: TypedDocumentNode<StationData, Station> = gql`
    query GetAllStations @cached {
        Station {
            latitude
            longitude
            id
            name
            number
        }
    }
`

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 600

interface propTypes {
    setSelectedStation: Function
    selectedStation: Station
    trips: trip | undefined
    center: number[]
    zoom: number
}

function MapWithStations(props: propTypes): JSX.Element {
    const { data: stationData } = useSuspenseQuery(GET_STATIONS)
    const stations: Station | undefined = stationData.Station

    function handleMarkerClick(e: Station) {
        props.setSelectedStation(e)
    }
    function handleMarkerClickHeat(e: string) {
        console.log(e)
        const station = stationData.Station.filter(
            (s: Station) => s.number === e
        )
        console.log(station[0])
        props.setSelectedStation(station[0])
    }

    function getColor(count: number) {
        if (count > 25) {
            return 'red'
        } else if (count > 10) {
            return 'orange'
        } else if (count > 1) {
            return 'yellow'
        } else {
            return 'white'
        }
    }

    return (
        <div>
            <Map
                className="map-wrap"
                center={props.center}
                zoom={props.zoom}
                width={DEFAULT_WIDTH}
                height={DEFAULT_HEIGHT}
            >
                {({ TileLayer, CircleMarker, Popup, Polyline }) => (
                    <>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {stations === undefined ? (
                            <></>
                        ) : (
                            stations.map((o: Station) => (
                                <CircleMarker
                                    center={[o.latitude, o.longitude]}
                                    key={o.id}
                                    radius={5}
                                    color={'black'}
                                    eventHandlers={{
                                        click: (e) => {
                                            handleMarkerClick(o)
                                        }
                                    }}
                                />
                            ))
                        )}
                        {props.trips === undefined ? (
                            <></>
                        ) : (
                            props.trips.map((o: trip) => (
                                <CircleMarker
                                    center={[o.latitude, o.longitude]}
                                    key={o.name}
                                    radius={5}
                                    color={getColor(o.count)}
                                    eventHandlers={{
                                        click: (e) => {
                                            handleMarkerClickHeat(o.number)
                                        }
                                    }}
                                />
                            ))
                        )}
                        {props.selectedStation === undefined ? (
                            <></>
                        ) : (
                            <CircleMarker
                                center={[
                                    props.selectedStation.latitude,
                                    props.selectedStation.longitude
                                ]}
                                key={props.selectedStation.id}
                                radius={9}
                                color={'black'}
                            />
                        )}
                    </>
                )}
            </Map>
        </div>
    )
}

export default MapWithStations
