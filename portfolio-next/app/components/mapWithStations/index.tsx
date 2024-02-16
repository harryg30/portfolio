import { Dispatch, SetStateAction, memo, useState } from 'react'
import React from 'react'
import Map from '../Map/DynamicMap'
import Link from 'next/link'
import { Station } from '../../../pages/api/db'
import { gql, skipToken, TypedDocumentNode } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import StationCard from '../StationCard'
import { DestinationsByMonth } from '@prisma/client'
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
    center: number[]
    zoom: number
}

const MapWithStations = memo(function MapWithStations(
    props: propTypes,
): JSX.Element {
    // const [selectedStation, setSelectedStation] = useState({
    //     id: -1,
    //     number: 'undefined',
    //     name: 'undefined',
    //     latitude: 0,
    //     longitude: 0,
    //     district: 'undefined',
    //     public: false,
    //     totalDocks: 0,
    //     deploymentYear: 0,
    // } as Station)

    const { data: stationData } = useSuspenseQuery(GET_STATIONS)
    const stations: Station | undefined = stationData.Station

    function handleMarkerClick(e: Station) {
        props.setSelectedStation(e)
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
                                    eventHandlers={{
                                        click: (e) => {
                                            handleMarkerClick(o)
                                        },
                                    }}
                                >
                                    <Popup>
                                        <Link href={'/station/' + o.number}>
                                            {o.name}
                                        </Link>
                                    </Popup>
                                </CircleMarker>
                            ))
                        )}
                    </>
                )}
            </Map>
        </div>
    )
})

export default MapWithStations
