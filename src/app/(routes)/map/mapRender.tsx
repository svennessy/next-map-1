"use client"

import MapComponent from "@/components/mapComponent"

interface MapProps {
  attributes: string
}

export default function MapRender({...props}: MapProps) {
  return (
    <div className={`${props.attributes}`}>
      <MapComponent />
    </div>
  )
}
