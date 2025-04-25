"use client"

import { useEffect, useState } from "react"

export const CoordinatesDisplay: React.FC = () => {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (err) => {
        setError("Unable to retrieve your location")
        console.error(err)
      }
    )
  }, [])

  if (error) {
    return <p className="text-red-600">{error}</p>
  }

  if (!coords) {
    return <p>Getting coordinates...</p>
  }

  return (
    <div className="flex text-center p-4">
      <p>Current Latitude: {coords.lat}</p>
      <p>Current Longitude: {coords.lon}</p>
    </div>
  )
}
