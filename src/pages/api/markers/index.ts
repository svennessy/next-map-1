import type { NextApiRequest, NextApiResponse } from "next"
import { db } from "../../../db"
import { markers } from "../../../db/schema"
//import { eq } from 'drizzle-orm'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const all = await db.select().from(markers)
    return res.status(200).json(all)
  }

  if (req.method === "POST") {
    const { name, lat, lng } = req.body
    if (!name || !lat || !lng)
      return res.status(400).json({ error: "Missing fields" })

    const inserted = await db
      .insert(markers)
      .values({ name, lat, lng })
      .returning()
    return res.status(200).json(inserted[0])
  }

  return res.status(405).json({ error: "Method not allowed" })
}
