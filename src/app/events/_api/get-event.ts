import { Event } from "@/app/types/event";
import { axiosInstance } from "@/lib/axios";
import { notFound } from "next/navigation";
import { cache } from "react";

export const getEvent = cache(async (slug: string) => {
  const { data } = await axiosInstance.get<Event>(`/events/${slug}`);

  if(!data) return notFound()
    
  return data;
});
