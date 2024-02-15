import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Map from '../Map/DynamicMap'
import Link from 'next/link'
import checkEnvironment from '../../../components/checkEnv'
import { Ride, Station } from '../../../pages/api/db'
import { gql, TypedDocumentNode } from '@apollo/client'
import {
    useQuery,
    useSuspenseQuery,
} from '@apollo/experimental-nextjs-app-support/ssr'

const GET_STATIONS: TypedDocumentNode<Data, Station> = gql`
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
interface Data {
    Station: Station
}
// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 600

const MapWithStations = (props) => {
    // const [ridesFromStation, setRidesFromStation] = useState([])
    // const [topDestinations, setTopDestinations] = useState([])
    // const [showDestinations, setShowDestinations] = useState(true)
    // const [ridesToStation, setRidesToStation] = useState([])
    // const [topOrigins, setTopOrigins] = useState([])
    // const [showOrigins, setShowOrigins] = useState(true)
    const [showPopUp, setShowPopUp] = useState(true)
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

    const { data } = useSuspenseQuery(GET_STATIONS)
    const stations: Station | undefined = data.Station
    function handleMarkerClick(e) {
        setSelectedStation(e)
    }

    return (
        <div>
            <div className="text-zone">
                <p>BlueBike Data Visualization</p>
            </div>
            <div>
                <Map
                    className="map-wrap"
                    center={props.center}
                    zoom={props.zoom}
                    height={props.height}
                    width={props.width}
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
                                        {showPopUp ? (
                                            <Popup>
                                                <Link
                                                    href={
                                                        '/station/' + o.number
                                                    }
                                                >
                                                    {o.name}
                                                </Link>
                                            </Popup>
                                        ) : (
                                            <></>
                                        )}
                                    </CircleMarker>
                                ))
                            )}
                        </>
                    )}
                </Map>
            </div>
        </div>
    )
}

export default MapWithStations

function getTopStations(rides, topN, origin) {
    if (rides === undefined || rides.length === 0) {
        return []
    }

    const stations = rides
        .map((ride) => {
            if (origin) {
                return ride.startingStation[0].station.number as String
            } else {
                return ride.endingStation[0].station.number as String
            }
        })
        .reduce((topS, station) => {
            if (!topS[station]) {
                topS[station] = 1
            } else {
                topS[station] += 1
            }
            return topS
        }, {})

    const keys = Object.keys(stations)
    keys.sort((a, b) => stations[b] - stations[a])

    return keys.slice(0, topN)
}
