"use client"

import MapComponent from "@/components/map/MapComponent"

interface MapProps {
  attributes: string
}

export default function RenderScaledMap({...props}: MapProps) {
  return (
    <div className={`${props.attributes}`}>
      <MapComponent />
    </div>
  )
}
