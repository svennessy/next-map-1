/* import Map, { Marker, MapLayerMouseEvent } from "react-map-gl/maplibre"
import { useState, useEffect } from "react" */
import { useState, useEffect } from "react"
import Map, { Marker } from "react-map-gl/maplibre"
import "maplibre-gl/dist/maplibre-gl.css"

interface MarkerData {
  latitude: number
  longitude: number
}

const MapComponent: React.FC = () => {
  // Store markers' coordinates
  const [markers, setMarkers] = useState<MarkerData[]>([])

  // Store current location coordinates
  const [currentLocation, setCurrentLocation] = useState<MarkerData | null>(
    null
  )

  // Handle map click event to add a marker
  const handleMapClick = (event: maplibregl.MapMouseEvent) => {
    const { lngLat } = event // lngLat contains the coordinates (longitude, latitude)
    setMarkers([...markers, { latitude: lngLat.lat, longitude: lngLat.lng }])
  }

  // Use geolocation API to get the user's current location
  useEffect(() => {
    const fetchCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setCurrentLocation({ latitude, longitude })
          },
          (error) => {
            console.error("Error getting location", error)
            // Handle location error (e.g., show an alert or use a default location)
          }
        )
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    }

    fetchCurrentLocation()
  }, [])

  return (
    <div className="w-full h-full p-4">
      {currentLocation?.latitude && currentLocation?.longitude && (
        <Map
          initialViewState={{
            longitude: currentLocation.longitude,
            latitude: currentLocation.latitude,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=GgFqu1gPINrMHaOWXhx0"
          /* onViewportChange={(newViewport) => setViewport(newViewport)} */
          onClick={handleMapClick}
        >
          {/* Render current location marker */}
          {currentLocation && (
            <Marker
              key="current-location"
              longitude={currentLocation.longitude}
              latitude={currentLocation.latitude}
            >
              {/* Current location marker */}
            </Marker>
          )}

          {/* Render additional markers */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              longitude={marker.longitude}
              latitude={marker.latitude}
            >
              
            </Marker>
          ))}
        </Map>
      )}
    </div>
  )
}

export default MapComponent

{/*<div style={{ color: "red" }}>📍</div>  Custom marker */}
{
  /* {markers?.map((marker, index) => (
            <Marker
              key={index}
              longitude={marker.longitude}
              latitude={marker.latitude}
            ></Marker>
          ))} */
}

/* const MapComponent = () => {
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [coordinates, setCoordinates] = useState<{
    lat: number
    lng: number
  } | null>(null)

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

  

  const handleMapClick = (e: MapLayerMouseEvent) => {
    
    const { lat, lng } = e.lngLat
    setCoordinates({ lat, lng })
  }

  return (
    <div className="flex w-full h-full">
      {error && <p>Error: {error}</p>}
      {latitude && longitude && (
        <Map
          initialViewState={{
            longitude: longitude,
            latitude: latitude,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=GgFqu1gPINrMHaOWXhx0"
          onClick={handleMapClick}
        >
          <Marker longitude={longitude} latitude={latitude}></Marker>
          {coordinates && (
            <Marker longitude={longitude} latitude={latitude}></Marker>
          )}
        </Map>
      )}
    </div>
  )
}

export default MapComponent
 */

/* function handleClick(e) {
    console.log(`Lat: ${e.lngLat.lat}`)
    console.log(`Long: ${e.lngLat.lng}`)
    console.log(e)
    console.log(e.lngLat)
  } */
