import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

export default function useGetTripPackages() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["trip-packages"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        "/api/v1/trip/get_all_sub_user_trip_packages",
        {
          params: {
            page: currentPage
          }
        }
      );
      return {
        data: res?.data?.results,
        count: res?.data?.count
      };
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  return { data, isLoading, error };
}
