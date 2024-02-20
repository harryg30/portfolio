import { memo, useState } from 'react'
import React from 'react'
import Map from '../Map/DynamicMap'
import Link from 'next/link'
import { Station } from '../../../pages/api/db'
import { gql, TypedDocumentNode } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

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
    center: number[]
    zoom: number
}

function MapWithStations(props: propTypes): JSX.Element {
    const { data: stationData } = useSuspenseQuery(GET_STATIONS)
    const stations: Station | undefined = stationData.Station

    function handleMarkerClick(e: Station) {
        console.log('Before setSelectedStation:', props.selectedStation)
        props.setSelectedStation(e)
        console.log('After setSelectedStation:', props.selectedStation)
    }

    return (
        <div>
            <p>{props.selectedStation.number}</p>
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
                                    color={'#0021b3'}
                                    eventHandlers={{
                                        click: (e) => {
                                            handleMarkerClick(o)
                                        },
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
                                    props.selectedStation.longitude,
                                ]}
                                key={props.selectedStation.id}
                                radius={5}
                                color={'#ff5100'}
                            />
                        )}
                    </>
                )}
            </Map>
        </div>
    )
}

export default MapWithStations
