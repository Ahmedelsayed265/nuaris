import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetYachtById(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["yacht", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/v1/yacht/get_fleet_by_id?fleet_id=${id}`
      );
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
