import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface TicketPayload {
  title: string;
  event: string;
  price: number;
  limit: number;
  description: string;
}

const useCreateTicket = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  return useMutation({
    mutationFn: async (payload: TicketPayload) => {
      if (!session?.user.accessToken) {
        throw new Error("Access token is missing or expired");
      }

      // Prepare FormData to be sent
      const form = new FormData();
      form.append("title", payload.title);
      form.append("event", payload.event);
      form.append("price", String(payload.price)); // convert to string
      form.append("limit", String(payload.limit)); // convert to string
      form.append("description", payload.description);

      // Log the request for debugging
      const url = `${axiosInstance.defaults.baseURL}/tickets`;
      console.log("Request URL:", url);
      console.log("Access Token:", session?.user.accessToken);
      console.log("Payload:", payload);

      try {
        // Send POST request to the API
        const response = await axiosInstance.post("/tickets", form, {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        });

        return response.data;
      } catch (error) {
        // Handle error and provide a useful message
        console.error("Error creating ticket:", error);
        throw error; // Rethrow error so it can be handled by onError
      }
    },
    onSuccess: async () => {
      alert("Ticket created successfully!");
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      console.error("Error creating ticket:", error);
      alert(error.response?.data.message ?? "Something went wrong while creating the ticket.");
    },
  });
};

export default useCreateTicket;
