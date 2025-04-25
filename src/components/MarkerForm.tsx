'use client'

import { useState } from 'react'

interface MarkerFormProps {
  coords: [number, number] | null
  onSubmitAction: (marker: { name: string; lat: number; lng: number }) => void
  error?: string | null
}

export const MarkerForm: React.FC<MarkerFormProps> = ({ coords, onSubmitAction, error }) => {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !coords) return

    onSubmitAction({
      name,
      lat: coords[1],
      lng: coords[0],
    })

    setName('')
  }

  return (
    <div className="mb-4 w-full">
      {error && (
        <div className="text-red-600 mb-2 p-2 border border-red-300 bg-red-50 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter marker name"
          className="flex-1 border border-gray-300 rounded px-3 py-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Location
        </button>
      </form>
    </div>
  )
}