import { User } from "@/app/types/user";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetDashboardProfile = () => {
  const session = useSession();
  return useQuery({
    queryKey: ["dashboard-profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("/settings", {
        headers: { Authorization: `Bearer ${session.data?.user.accessToken}` },
      });
      return data;
    },
  });
};
