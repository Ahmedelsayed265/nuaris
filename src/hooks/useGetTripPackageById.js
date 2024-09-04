import axiosInstance from "../utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export default function useGetTripPackageById(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["trip-package", id],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/api/v1/trip/get_trip_package_by_id?trip_package_id=${id}`
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
