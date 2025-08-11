import { useQuery } from "@tanstack/react-query";
import { getTasks, refresh } from "../API/axios";

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

export const useRefreshQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    staleTime: Infinity, // дані ніколи не застарівають
    cacheTime: Infinity, // кеш завжди тримається
    refetchOnMount: false, // не оновлювати при монтуванні
    refetchOnWindowFocus: false, // не оновлювати при поверненні вкладки
    refetchOnReconnect: false, // не оновлювати при відновленні з’єднання
    retry: false,
  });
};
