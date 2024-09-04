import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/v1/users/get_user_info");
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
