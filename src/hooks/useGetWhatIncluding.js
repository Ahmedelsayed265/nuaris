import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetWhatIncluding() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["what_including"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/v1/yacht/get_includings");
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
