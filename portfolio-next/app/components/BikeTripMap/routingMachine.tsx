import L from 'leaflet'
import 'leaflet-routing-machine'
import { useMap } from 'react-leaflet'
import { useEffect } from 'react'


export default function RoutingMachine(props) {
    const map = useMap()
    useEffect(() => {
        if (!map) return

        const routingControl = L.Routing.control({
            waypoints: [
                L.latLng(props.start[0], props.start[1]),
                L.latLng(props.end[0], props.end[1]),
            ],
            show: true,
            addWaypoints: false,
            routeWhileDragging: false,
            draggableWaypoints: false,
            fitSelectedRoutes: false,
            showAlternatives: false,
        }).addTo(map)

        return () => map.removeControl(routingControl)
    }, [map])

    return null
}
