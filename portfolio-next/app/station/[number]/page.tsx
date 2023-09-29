import checkEnvironment from "../../../components/checkEnv";
import { Station } from "../../../pages/api/db";
import Charts from "./Charts";

export async function generateStaticParams() {
  try {
    const stations = await fetch(
      checkEnvironment().concat("/api/getAllStations"),
      { method: "GET" }
    ).then((res) => res.json());
    return Array.from(stations).map((station: Station) => ({
      number: station.number,
    }));
  } catch (error) {
    console.error(error);
    return {number: "D32034"}
  }
}

export default function Page({ params }) {
  const { number } = params;

  return (
    <div className="container station-page">
      <Charts number={number} />
    </div>
  );
}
