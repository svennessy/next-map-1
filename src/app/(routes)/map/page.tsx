
//import RenderScaledMap from "../../../components/map/RenderScaledMap"
import MarkersPage from "@/components/map/MapComponent"

export const metadata = {
  title: "Map",
}

export default async function Map() {
  return <MarkersPage />
}

{/* <RenderScaledMap attributes={"flex w-full h-full"} /> */}