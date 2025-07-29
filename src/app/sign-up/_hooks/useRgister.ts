import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post("/auth/register", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("sign up success");
      router.push("/sign-in");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useRegister;

// delete hidden folder .git
// git init
// git add .
// git commit -m "initial commit"

// git remote add origin https://github.com/Ray110103/blog-app-api-fe.git
// git branch -M main
// git push -u origin main
