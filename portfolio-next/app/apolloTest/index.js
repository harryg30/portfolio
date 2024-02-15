import useQuery from '@apollo/experimental-nextjs-app-support/ssr'

const GET_STATIONS = gql`
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

export default function Hello() {
    const { loading, error, data } = useQuery(GET_STATIONS)
    if (loading) return <p>Loading ...</p>
    return <h1>Hello {data.greeting.message}!</h1>
}
