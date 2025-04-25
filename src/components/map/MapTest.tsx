"use client"

import maplibregl from "maplibre-gl"
import { useEffect, useRef, useState } from "react"
import { useCurrentLocation } from "@/hooks/useCurrentLocation"
import { MarkerForm } from "../MarkerForm"

export const MapTest: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markerRef = useRef<maplibregl.Marker | null>(null)

  const { coords: initialCoords, error } = useCurrentLocation()
  const [markerCoords, setMarkerCoords] = useState<[number, number] | null>(
    null
  )

  useEffect(() => {
    if (!mapContainer.current || !initialCoords) return

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=GgFqu1gPINrMHaOWXhx0",
      center: initialCoords,
      zoom: 13,
    })

    mapRef.current = map

    // Click to place a marker
    map.on("click", (e) => {
      const lngLat = e.lngLat

      // Remove previous marker
      if (markerRef.current) {
        markerRef.current.remove()
      }

      // Create new draggable marker
      const newMarker = new maplibregl.Marker({ draggable: true })
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(map)

      markerRef.current = newMarker
      setMarkerCoords([lngLat.lng, lngLat.lat])

      newMarker.on("dragend", () => {
        const pos = newMarker.getLngLat()
        setMarkerCoords([pos.lng, pos.lat])
      })
    })

    return () => map.remove()
  }, [initialCoords])

  const handleMarkerSubmit = async ({
    name,
    lat,
    lng,
  }: {
    name: string
    lat: number
    lng: number
  }) => {
    const res = await fetch("/api/markers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, lat, lng }),
    })

    const newMarker = await res.json()

    const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
      `<strong>${newMarker.name}</strong><br/>Lat: ${newMarker.lat}<br/>Lng: ${newMarker.lng}`
    )

    new maplibregl.Marker()
      .setLngLat([newMarker.lng, newMarker.lat])
      .setPopup(popup)
      .addTo(mapRef.current!)
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <MarkerForm
        coords={markerCoords}
        onSubmitAction={handleMarkerSubmit}
        error={error}
      />
      <div
        className="h-80 w-full border rounded overflow-hidden"
        ref={mapContainer}
      />
    </div>
  )
}
