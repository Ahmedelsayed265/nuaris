import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetPeriodTypes(feature, isMin) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["period_types", feature, isMin],
    queryFn: async () => {
      let url = "/api/v1/yacht/get_period_types";
      const params = [];

      if (isMin) params.push(`is_min_rental_period=${isMin}`);
      if (feature) params.push(`feature=${feature}`);

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const res = await axiosInstance.get(url);
      return res.data;
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
