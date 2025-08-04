import type { Organizer } from "@/app/types/event"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

export async function getOrganizer(adminId: number): Promise<Organizer | null> {
  try {
    const response = await fetch(`${API_URL}/organizers/${adminId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add cache revalidation for better performance
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const organizer = await response.json()
    return organizer
  } catch (error) {
    console.error("Failed to fetch organizer:", error)

    // Fallback to sample data for demo purposes
    return getSampleOrganizer(adminId)
  }
}

// Sample data fallback
function getSampleOrganizer(adminId: number): Organizer | null {
  const sampleOrganizers: Organizer[] = [
    {
      id: "1",
      name: "Daniel Reinhard",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Made Sutrisna",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    sampleOrganizers.find((org) => org.id === adminId.toString()) || {
      id: adminId.toString(),
      name: "Unknown Organizer",
      avatar: "/placeholder.svg?height=40&width=40",
    }
  )
}
