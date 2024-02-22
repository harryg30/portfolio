import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

export default function RoutingMachine(props) {
    const map = useMap()
    useEffect(() => {
        if (!map) return
        console.log(props.waypoints)
        const routingControl = L.Routing.control({
            waypoints: props.waypoints,
            show: true,
            profile: 'cycling',
            addWaypoints: false,
            routeWhileDragging: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            showAlternatives: false,
            lineOptions: {
                styles: [{color: 'green', opacity: 1, weight: 5}, {color: 'red', opacity: 1, weight: 1}]
             }
        }).addTo(map)

        return () => map.removeControl(routingControl)
    }, [map])

    return null
}
