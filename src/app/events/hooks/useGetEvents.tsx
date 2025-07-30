import { Event } from "@/app/types/events";
import { PageableResponse, PaginationQueries } from "@/app/types/pagination";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
}

const useGetEvents = (queries?: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events",
        { params: queries },
      );
      return data;
    },
  });
};

export default useGetEvents;
