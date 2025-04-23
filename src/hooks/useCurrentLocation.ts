import { useEffect, useState } from "react";

type Coordinates = {
  latitude: number;
  longitude: number;
} | null;

export function useCurrentLocation() {
  const [coordinates, setCoordinates] = useState<Coordinates>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        setError(err.message);
      }
    );
  }, []);

  return { coordinates, error };
}