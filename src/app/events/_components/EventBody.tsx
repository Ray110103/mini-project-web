import Markdown from "@/components/Markdown"
import type { FC } from "react"
import { getEvent } from "../_api/get-event"

interface EventBodyProps {
  slug: string
}

const EventBody: FC<EventBodyProps> = async ({ slug }) => {
  const event = await getEvent(slug)

  return (
    <div className="lg:col-span-3 mt-12">
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">About This Event</h2>
        <div className="text-gray-300 leading-relaxed">
          <Markdown description={event.description} />
        </div>
      </div>
    </div>
  )
}

export default EventBody
