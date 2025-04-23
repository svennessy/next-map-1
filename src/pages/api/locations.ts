import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/db'; // Drizzle connection
import { locations } from '@/drizzle/schema'; // Import the table schema

// Define the function to insert the coordinates into the database
const saveLocation = async (lat: number, lng: number) => {
  try {
    // Insert using the defined 'locations' table schema
    const result = await db.insert(locations).values({
      latitude: lat,
      longitude: lng,
    });

    return result;
  } catch (error) {
    console.error('Error saving location:', error);
    throw new Error('Failed to save location');
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { lat, lng } = req.body;

    // Validate the input data
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
    }

    try {
      // Save the location into the database
      await saveLocation(lat, lng);
      return res.status(200).json({ message: 'Location saved successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error saving location' });
    }
  } else {
    // Handle unsupported HTTP methods (e.g., GET, PUT, DELETE)
    return res.status(405).json({ error: 'Method not allowed' });
  }
}