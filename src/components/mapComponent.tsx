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
  const [error, setError] = useState<string | null>(null)
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false)

  // Handle map click event to add a marker
  const handleMapClick = (event: maplibregl.MapMouseEvent) => {
    const { lngLat } = event // lngLat contains the coordinates (longitude, latitude)
    setMarkers([...markers, { latitude: lngLat.lat, longitude: lngLat.lng }])
  }

  // Use geolocation API to get the user's current location
  useEffect(() => {
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setCurrentLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setPermissionDenied(false) // Reset permission denied flag
        },
        (err: GeolocationPositionError) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              setError("Permission denied. Please enable location access.")
              setPermissionDenied(true) // Set the flag to true
              break
            case err.POSITION_UNAVAILABLE:
              setError("Position unavailable")
              break
            case err.TIMEOUT:
              setError("Request timed out")
              break
            default:
              setError("An unknown error occurred")
          }
        }
      )
    } else {
      setError("Geolocation is not supported or not running in a browser")
    }
  }, [])

  return (
    <div className="w-full h-full p-4">
      {permissionDenied && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffcc00",
            color: "black",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <p>
            Permission denied! Please allow location access in your browser to
            use this feature.
          </p>
        </div>
      )}

      {currentLocation ? (
        <Map
          initialViewState={{
            longitude: currentLocation.longitude,
            latitude: currentLocation.latitude,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="https://api.maptiler.com/maps/streets/style.json?key=GgFqu1gPINrMHaOWXhx0"
          onClick={handleMapClick}
          scrollZoom={true} // Allow zoom with scroll
          dragPan={true} // Allow map dragging
        >
          {/* Render current location marker */}
          <Marker
            key="current-location"
            longitude={currentLocation.longitude}
            latitude={currentLocation.latitude}
          >
            {/* Current location marker */}
          </Marker>

          {/* Render additional markers */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              longitude={marker.longitude}
              latitude={marker.latitude}
            ></Marker>
          ))}
        </Map>
      ) : (
        <p>Loading your location...</p>
      )}

      {error && !permissionDenied && <p style={{ color: "red" }}>{error}</p>}
    </div>
  )
}

export default MapComponent

/* const fetchCurrentLocation = () => {
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
  }, []) */
{
  /* {currentLocation?.latitude && currentLocation?.longitude && (
        
      )} */
}
{
  /*<div style={{ color: "red" }}>📍</div>  Custom marker */
}
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
