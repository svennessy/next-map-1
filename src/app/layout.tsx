import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import 'maplibre-gl/dist/maplibre-gl.css'
import "./globals.css"
import Navbar from "@/components/NavBar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Map Take One",
  description: "It's a map what do you want from me",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col w-dvw h-dvh items-center  `}
      >
        <Navbar />
        {children}
      </body>
    </html>
  )
}
