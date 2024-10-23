import { fetchRestaurantData } from '@/services/restaurantService'

/**
 * API route handler to fetch restaurant data
 * @returns {Promise<Response>} - A promise that resolves to the restaurant data in JSON format
 */
export async function GET() {
  try {
    const data = await fetchRestaurantData()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching restaurant data:', error)
    return new Response(JSON.stringify({ error: 'Error fetching restaurant data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}