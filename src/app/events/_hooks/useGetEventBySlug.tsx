import { Event } from "@/app/types/event";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetEventBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["event", slug],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(`/events/${slug}`);
      return data;
    },
  });
};

export default useGetEventBySlug;
