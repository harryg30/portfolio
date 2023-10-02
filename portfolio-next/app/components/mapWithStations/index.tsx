import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Map from '../Map/DynamicMap'
import Link from 'next/link'
import checkEnvironment from '../../../components/checkEnv'
import { Ride, Station } from '../../../pages/api/db'

// Set default sizing to control aspect ratio which will scale responsively
// but also help avoid layout shift

const DEFAULT_WIDTH = 600
const DEFAULT_HEIGHT = 600

const MapWithStations = (props) => {
    const [stations, setStations] = useState([])
    const [ridesFromStation, setRidesFromStation] = useState([])
    const [topDestinations, setTopDestinations] = useState([])
    const [showDestinations, setShowDestinations] = useState(true)
    const [ridesToStation, setRidesToStation] = useState([])
    const [topOrigins, setTopOrigins] = useState([])
    const [showOrigins, setShowOrigins] = useState(true)
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

    useEffect(() => {
        fetch(checkEnvironment().concat('/api/getAllStations'), {
            method: 'GET',
        })
            .then((resp) => resp.json())
            .then((data) => setStations(data.stations))
    }, [])

    useEffect(() => {
        if (selectedStation.id !== -1)
            //get destinations
            fetch(
                checkEnvironment().concat(
                    '/api/ridesFromStation?stationNo=',
                    selectedStation.number,
                ),
                { method: 'GET' },
            )
                .then((resp) => resp.json())
                .then((data) => setRidesFromStation(data.rides))
        const destinationNumbers = getTopStations(ridesFromStation, 3, false)
        let destinationsString = ''
        for (const i in destinationNumbers) {
            if (destinationsString == '') {
                destinationsString += destinationNumbers[i]
            } else {
                destinationsString =
                    destinationsString + ',' + destinationNumbers[i]
            }
        }

        fetch(
            checkEnvironment().concat(
                '/api/getMultipleStations?stations=',
                destinationsString,
            ),
            { method: 'GET' },
        )
            .then((resp) => resp.json())
            .then((data) => setTopDestinations(data.station))

        //now origins
        fetch(
            checkEnvironment().concat(
                '/api/ridesToStation?stationNo=',
                selectedStation.number,
            ),
            { method: 'GET' },
        )
            .then((resp) => resp.json())
            .then((data) => setRidesToStation(data.rides))
        const originNumbers = getTopStations(ridesToStation, 3, true)
        let originsString = ''
        for (const i in originNumbers) {
            if (originsString == '') {
                originsString += originNumbers[i]
            } else {
                originsString = originsString + ',' + originNumbers[i]
            }
        }

        fetch(
            checkEnvironment().concat(
                '/api/getMultipleStations?stations=',
                originsString,
            ),
            { method: 'GET' },
        )
            .then((resp) => resp.json())
            .then((data) => setTopOrigins(data.station))
    }, [selectedStation])

    function handleMarkerClick(e) {
        setSelectedStation(e)
    }

    return (
        <div>
            <div className="text-zone">
                <p>BlueBike Data Visualization</p>
                <p>
                    <label className="switch">
                        {/* Show Top 3 Destinations (black) */}
                        <input
                            type="checkbox"
                            checked={showDestinations}
                            id={'showDestinations'}
                            onClick={() =>
                                setShowDestinations(!showDestinations)
                            }
                        />
                        <span className="slider round"></span>
                    </label>{' '}
                    Show Top 3 Destinations (black)
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={showOrigins}
                            id={'showOrigins'}
                            onClick={() => setShowOrigins(!showOrigins)}
                        />
                        <span className="slider round"></span>
                    </label>{' '}
                    Show Top 3 Origins (red){' '}
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={showPopUp}
                            id={'enablePopUp'}
                            onClick={() => setShowPopUp(!showPopUp)}
                        />
                        <span className="slider round"></span>
                    </label>{' '}
                    Enable PopUp{' '}
                </p>
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
                            {stations.length === 0 || stations === undefined ? (
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
                            {showDestinations === false ||
                            topDestinations.length === 0 ||
                            topDestinations === undefined ||
                            selectedStation === undefined ? (
                                <></>
                            ) : (
                                topDestinations.map((o: Station) => (
                                    <Polyline
                                        pathOptions={{ color: 'black' }}
                                        positions={[
                                            [
                                                selectedStation.latitude,
                                                selectedStation.longitude,
                                            ],
                                            [o.latitude, o.longitude],
                                        ]}
                                    />
                                ))
                            )}
                            {showOrigins === false ||
                            topOrigins.length === 0 ||
                            topOrigins === undefined ||
                            selectedStation === undefined ? (
                                <></>
                            ) : (
                                topOrigins.map((o: Station) => (
                                    <Polyline
                                        pathOptions={{ color: 'red' }}
                                        positions={[
                                            [
                                                selectedStation.latitude,
                                                selectedStation.longitude,
                                            ],
                                            [o.latitude, o.longitude],
                                        ]}
                                    />
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
