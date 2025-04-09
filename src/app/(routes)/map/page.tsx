import Link from "next/link"
import MapRender from "./mapRender"

export const metadata = {
  title: "Map",
}

export default async function Map() {
  
  return (
    <>
      <h1 className="p-4">Map</h1>
      <Link href={"/"} className="bg-emerald-400 px-4 py-2 rounded-2xl">
        Go Home
      </Link>
      
      <MapRender />
    </>
  )
}
