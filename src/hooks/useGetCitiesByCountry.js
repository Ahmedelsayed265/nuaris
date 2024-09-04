import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetCitiesByCountry(name) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cities", name],
    queryFn: async () => {
      const res = await axiosInstance.get(`/cities?country__name=${name}`);
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
