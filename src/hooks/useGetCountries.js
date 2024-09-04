import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetCountries() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await axiosInstance.get("/countries/");
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
