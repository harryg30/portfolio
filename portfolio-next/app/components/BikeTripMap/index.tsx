'use client'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import L from 'leaflet'
import Map from '../Map/DynamicMap'
import checkEnvironment from '../../../components/checkEnv'
import { Ride, Station } from '../../../pages/api/db'
import RoutingMachine from './routingMachine'

export default function BikeTripMap(props) {
    const [rides, setRides] = useState([])

    useEffect(() => {
        fetch(
            checkEnvironment().concat('/api/ridesOnBike?bikeId=', props.bikeId),
            {
                method: 'GET',
            },
        )
            .then((resp) => resp.json())
            .then((data) => setRides(data.rides))
    }, [])

    return (
        <div>
            <Map
                className="map-wrap"
                center={props.center}
                zoom={props.zoom}
                height={props.height}
                width={props.width}
            >
                {({ TileLayer, SVGOverlay, Polyline }) => (
                    <>
                        {' '}
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {rides.length > 0 ? (
                            <RoutingMachine
                                waypoints={rides.map((o: any) =>
                                    L.latLng(
                                        o.startingStation[0].station.latitude,
                                        o.startingStation[0].station.longitude,
                                    ),
                                )}
                            />
                        ) : (
                            <></>
                        )}
                        {/* {rides === undefined || rides.length === 0 ? (
                            <></>
                        ) : (
                            rides.map((o: any) => (
                                <div>
                                    <Polyline
                                        pathOptions={{ color: 'black' }}
                                        positions={[
                                            [
                                                o.startingStation[0].station
                                                    .latitude,
                                                o.startingStation[0].station
                                                    .longitude,
                                            ],
                                            [
                                                o.endingStation[0].station
                                                    .latitude,
                                                o.endingStation[0].station
                                                    .longitude,
                                            ],
                                        ]}
                                    />
                                </div>
                            ))
                        )} */}
                    </>
                )}
            </Map>
        </div>
    )
}
