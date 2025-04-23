
import dynamic from "next/dynamic"
import { useState } from "react"

const MapSelector = dynamic(() => import("./mapSelector"), { ssr: false })

export default function LocationModal({ onClose }: { onClose: () => void }) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  )
  const [saving, setSaving] = useState(false)

  const saveLocation = async () => {
    if (!coords) return
    setSaving(true)
    await fetch("/api/locations", {
      method: "POST",
      body: JSON.stringify(coords),
      headers: {
        "Content-Type": "application/json",
      },
    })
    setSaving(false)
    onClose()
  }

  return (
    <div className="flex w-full h-fit p-4 bg-amber-600">
      <h2>Select a location</h2>
      <MapSelector onSelect={setCoords} />
      <button disabled={!coords || saving} onClick={saveLocation}>
        {saving ? "Saving..." : "Save"}
      </button>
      <button onClick={onClose}>Cancel</button>
    </div>
  )
}
