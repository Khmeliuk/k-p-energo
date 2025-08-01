import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../API/axios";

export const useAllTaskQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    refetchOnWindowFocus: true,
  });
};

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: ["user"],
    enabled: false,
  });
};
