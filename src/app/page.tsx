"use client"

import Image from "next/image"
//import dynamic from "next/dynamic"
import DateTimeRender from "@/components/dateTimeRender"
import { useState, useEffect } from "react"
import LocationDisplay from "@/components/LocationDisplay"

/* const LocationModal = dynamic(() => import("../components/locationModal"), {
  ssr: false,
}) */

// https://nextjs.org/learn/pages-router/data-fetching-implement-getstaticprops

export default function Home() {
  const [showModal, setShowModal] = useState(false)
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
          className="self-center py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          onClick={() => setShowModal(true)}
        >
          Add Location
        </button>

        {showModal && <LocationDisplay />}


        {/* Conditionally render the modal 
        {showModal && <LocationModal onClose={() => setShowModal(false)} />}*/}
      </div>
    </div>
  )
}

{
  /* <div className="p-4">
        <Link
          href={"/map"}
          className="bg-emerald-400 px-4 py-2 rounded-2xl cursor-pointer"
        >
          Go to Map
        </Link>
      </div> */
}
