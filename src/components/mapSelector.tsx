"use client"

import { useCallback } from "react"
import Map, {
  Marker,
  NavigationControl,
  MapLayerMouseEvent,
  ViewState,
} from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import maplibregl from "maplibre-gl"
import { useQuery, UseQueryResult, useMutation } from "@tanstack/react-query"

const MAP_STYLE =
  "https://api.maptiler.com/maps/streets/style.json?key=GgFqu1gPINrMHaOWXhx0"

type Props = {
  onSelect: (coords: { lat: number; lng: number }) => void
}

type Coords = {
  lat: number
  lng: number
}

const getUserLocation = async (): Promise<Coords> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported"))
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        (err) => {
          reject(err)
        }
      )
    }
  })
}

const useSaveLocation = () =>
  useMutation({
    mutationFn: async ({ lat, lng }: Coords) => {
      const res = await fetch("/api/saveLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lat, lng }),
      })

      if (!res.ok) throw new Error("Failed to save location")

      return res.json()
    },
  })

const MapSelector = ({ onSelect }: Props) => {
  const {
    data: userCoords,
    isLoading,
    isError,
  }: UseQueryResult<Coords, Error> = useQuery({
    queryKey: ["user-location"],
    queryFn: getUserLocation,
    staleTime: Number.POSITIVE_INFINITY, // or Infinity as number
  })

  const { mutate: saveLocation } = useSaveLocation()

  const handleClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const { lat, lng } = e.lngLat
      onSelect({ lat, lng })
      saveLocation({ lat, lng }) // cleaner + benefits from React Query
    },
    [onSelect, saveLocation]
  )

  if (isLoading) {
    return <div>Loading map…</div>
  }

  if (isError || !userCoords) {
    return (
      <div>
        Unable to access your location. Please allow location permission.
      </div>
    )
  }

  const initialViewState: ViewState = {
    latitude: userCoords?.lat ?? 0, // Default to 0 if undefined
    longitude: userCoords?.lng ?? 0, // Default to 0 if undefined
    zoom: 13, // You can keep your zoom value
    bearing: 0, // Default bearing (rotation angle) to 0
    pitch: 0, // Default pitch (tilt) to 0
    padding: { top: 0, left: 0, right: 0, bottom: 0 }, // Optional, or use a value like { top: 0, left: 0, right: 0, bottom: 0 }
  }

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Map
        mapLib={maplibregl}
        initialViewState={initialViewState}
        mapStyle={MAP_STYLE}
        style={{ width: "100%", height: "100%" }}
        onClick={handleClick}
      >
        <NavigationControl position="top-left" />
        {userCoords && (
          <Marker
            longitude={userCoords.lng}
            latitude={userCoords.lat}
            anchor="bottom"
          >
            {/* Optional: <img src="/marker-icon.png" alt="Marker" width={30} /> */}
          </Marker>
        )}
      </Map>
    </div>
  )
}

export default MapSelector
