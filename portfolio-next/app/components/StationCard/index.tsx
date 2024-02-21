import { Station } from '../../../pages/api/db'
import { DocumentTransform, gql, TypedDocumentNode } from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { DestinationsByMonth } from '../../../pages/api/db'
import { Card } from 'antd'
import { visit, Kind, BREAK } from 'graphql'
import { ScaleTypes, StackedBarChart } from '@carbon/charts-react'
import '@carbon/charts-react/styles.css'

interface Vars {
    stationNumber: String
    limit: number
}

interface Data {
    DestinationsByMonth: DestinationsByMonth
}

const GET_DESTINATIONS_BY_STATION: TypedDocumentNode<Data, Vars> = gql`
    query GetDestinationsByStation($stationNumber: String!, $limit: Int!) {
        DestinationsByMonth(
            order_by: { count: desc }
            limit: $limit
            where: { startStationNumber: { _eq: $stationNumber } }
        ) {
            value: count
            key: endStationNumber
            group: month
        }
    }
`
// const documentTransform = new DocumentTransform((document) => {
//     const transformedDocument = visit(document, {
//         Field(field) {
//             if (field.name.value !== 'currentUser') {
//                 return
//             }
//             return { ...field }
//         },
//     })

//     return transformedDocument
// })
interface propTypes {
    station: Station
}

export default function StationCard(props: propTypes): JSX.Element {
    const number = props.station.number
    const { data } = useSuspenseQuery(GET_DESTINATIONS_BY_STATION, {
        variables: { stationNumber: number, limit: 100 },
    })

    const bar_data: { value: Int16Array; key: string; group: string } | any =
        data.DestinationsByMonth.map((row) => {
            return {
                value: row.value,
                key: row.key,
                group: toMonthName(row.group),
            }
        })

    return (
        <>
            <Card title={props.station.name}>
                {bar_data === undefined ? (
                    <></>
                ) : (
                    <StackedBarChart
                        data={bar_data}
                        options={{
                            title: 'Top Destination Stations By Month (2023)',
                            axes: {
                                left: {
                                    mapsTo: 'value',
                                    stacked: true,
                                },
                                bottom: {
                                    mapsTo: 'key',
                                    scaleType: 'labels' as ScaleTypes,
                                },
                            },
                            height: '300px',
                        }}
                    />
                )}
            </Card>
        </>
    )
}
function toMonthName(monthNumberString: string) {
    // Convert the month number string to an integer
    const monthNumber = parseInt(monthNumberString, 10)

    // Create an array of month names
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ]

    // Return the corresponding month name
    return monthNames[monthNumber - 1]
}
