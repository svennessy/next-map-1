import { useEffect, useState } from 'react'

export function useCurrentLocation() {
  const [coords, setCoords] = useState<[number, number] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords([pos.coords.longitude, pos.coords.latitude])
      },
      (err) => {
        setError(err.message)
      }
    )
  }, [])

  return { coords, error }
}