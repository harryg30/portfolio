
const checkEnvironment = () => {
    let base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://www.hgordenstein.com";

    return base_url;
};


export async function generateStaticParams() {
    const stations = await fetch(checkEnvironment().concat('/api/getStations'), { method: 'GET' }).then((res) => res.json())

    return Array.from(stations).map((station: {
        id: number,
        number: String,
        name: String,
        latitude: number,
        longitude: number,
        district: String,
        public: Boolean,
        totalDocks: number,
        deploymentYear: number
    }) => ({
        number: station.number,
    }))
}

export default function Page({ params }) {
    const { number } = params
    return (
        <div className="container station-page">
            <div className="text-zone">
                <p>{number}</p>
            </div>
        </div>
    )
}