import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask } from "../API/axios";

export const useAuthMutation = function (fetchfunction) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchfunction,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
    },
    onError: (error) => {
      console.error("Auth error:", error);
    },
  });
};

export const useCreateTask = function () {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSettled: async (data, err) => {
      if (err) {
        console.error(err);
      }
      await queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
