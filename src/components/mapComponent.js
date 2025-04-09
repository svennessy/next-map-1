import Map from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"
import { useState, useEffect } from "react"

const MapComponent = () => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      // Check if in a browser environment and geolocation is available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
          setError(null)
        },
        (error) => {
          setError(error.message)
          setLatitude(null)
          setLongitude(null)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      )
    } else {
      setError("Geolocation is not supported by this browser.")
    }
  }, [])

  return (
    <>
      {error && <p>Error: {error}</p>}
      {latitude && longitude && (
        <Map
          initialViewState={{
            longitude: longitude,
            latitude: latitude,
            zoom: 14,
          }}
          style={{ width: '100%', height: '80dvh' }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=GgFqu1gPINrMHaOWXhx0"
        />
      )}
    </>
  )
}

export default MapComponent
