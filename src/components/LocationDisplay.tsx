// components/LocationDisplay.tsx
"use client";

import { useCurrentLocation } from "@/hooks/useCurrentLocation";

export default function LocationDisplay() {
  const { coordinates, error } = useCurrentLocation();

  if (error) return <p>Error: {error}</p>;
  if (!coordinates) return <p>Getting location...</p>;

  return (
    <div>
      <p>Latitude: {coordinates.latitude}</p>
      <p>Longitude: {coordinates.longitude}</p>
    </div>
  );
}