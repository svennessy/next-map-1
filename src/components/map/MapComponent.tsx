"use client"

import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { useCurrentLocation } from "@/hooks/useCurrentLocation"

interface Marker {
  id: string
  name: string
  lat: number
  lng: number
}

export default function MarkersPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [markers, setMarkers] = useState<Marker[]>([])
  const { coords, error } = useCurrentLocation()

  useEffect(() => {
    const fetchMarkers = async () => {
      const res = await fetch("/api/markers")
      const data = await res.json()
      setMarkers(data)
    }

    fetchMarkers()
  }, [])

  useEffect(() => {
    if (!mapContainerRef.current || markers.length === 0 || !coords) return

    if (!mapContainerRef.current) {
      console.log("No map container")
      return
    }
    if (markers.length === 0) {
      console.log("No markers loaded")
      return
    }
    if (!coords) {
      console.log("Waiting for coords")
      return
    }

    console.log("Rendering map with coords:", coords)

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=GgFqu1gPINrMHaOWXhx0",
      center: coords,
      zoom: 10,
    })

    mapRef.current = map

    markers.forEach((marker) => {
      const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
        `<strong>${marker.name}</strong>`
      )

      new maplibregl.Marker()
        .setLngLat([marker.lng, marker.lat])
        .setPopup(popup)
        .addTo(map)
    })

    return () => map.remove()
  }, [markers, coords])

  return (
    <div className="w-full h-full p-4">
      <h1 className="text-2xl font-bold">All Saved Markers</h1>
      {coords ? (
        <div
          ref={mapContainerRef}
          className="w-full h-[500px] rounded border shadow"
        />
      ) : (
        <p>Loading your location...</p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}
