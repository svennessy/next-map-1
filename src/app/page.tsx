"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { LocationDisplay } from "@/components/LocationDisplay"
import { CoordinatesDisplay } from "@/components/CoordinatesDisplay"
import DateTimeRender from "@/components/DateTimeRender"

// https://nextjs.org/learn/pages-router/data-fetching-implement-getstaticprops

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [now, setNow] = useState<Date | null>(null)

  const customFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }

  useEffect(() => {
    // Only set the date on the client to avoid hydration mismatch
    setNow(new Date())
  }, [])

  return (
    <div className="flex flex-col w-dvw h-dvh items-center justify-center ">
      <h1 className="text-xl font-bold">Home</h1>
      <Image
        src="/images/matilda.png"
        height={244}
        width={244}
        alt="Harry's House"
      />

      {/* Render only after the component has mounted */}
      {now && <DateTimeRender date={now} formatOptions={customFormatOptions} />}

      <div className="flex w-8/12 h-6/12 p-4 justify-center bg-cyan-600">

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Open Modal
        </button>

        <LocationDisplay
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <h1>Modal Name</h1>
          <CoordinatesDisplay />
        </LocationDisplay>
      
      </div>
    </div>
  )
}

