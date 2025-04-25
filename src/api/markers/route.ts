import { NextResponse } from "next/server"
import { db } from "@/db"
import { markers } from "@/db/schema"

export async function GET() {
  const allMarkers = await db.select().from(markers)
  return NextResponse.json(allMarkers)
}
