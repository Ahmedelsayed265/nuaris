import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetPositions() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["positions"],
    queryFn: async () => {
      const res = await axiosInstance.get("/positions/?page_size=1000");
      return res.data?.results;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
