import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

export default function useGetYachts() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["yachts", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/v1/yacht/get_all_sub_user_fleets`,
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

  return { data, isLoading, error, refetch };
}
