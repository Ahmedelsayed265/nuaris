import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetYachtCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["yacht_categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/v1/yacht/get_categories");
      return res.data?.results;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
