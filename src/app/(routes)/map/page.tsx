// import Link from "next/link"
import MapRender from "../../../components/map/MapRender"

export const metadata = {
  title: "Map",
}

export default async function Map() {
  return <MapRender attributes={"flex w-full h-full"} />
}