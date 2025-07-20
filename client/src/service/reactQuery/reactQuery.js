import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../API/asios";

export const useAllTaskQuery = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
    refetchOnWindowFocus: false,
  });
};

// export const useAddressQuery = () => {
//   return useQuery({
//     queryKey: ["address"],
//     queryFn: fetchAddresses,
//     refetchOnWindowFocus: false,
//   });
// };
