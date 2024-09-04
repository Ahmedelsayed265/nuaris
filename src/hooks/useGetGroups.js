import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";

export default function useGetGroups() {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["groups", currentPage],
    queryFn: async () => {
      const res = await axiosInstance.get("/groups", {
        params: {
          page: currentPage
        }
      });
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
