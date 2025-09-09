import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, patchStatus } from "../API/axios";
import { useSyncAuthAcrossTabs } from "../../hooks/useSyncAuthAcrossTabs";

export const useAuthMutation = function (fetchFunction) {
  const queryClient = useQueryClient();
  const { notifyAuthUpdate } = useSyncAuthAcrossTabs();

  return useMutation({
    mutationFn: fetchFunction,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      notifyAuthUpdate(); // 🔔 повідомляємо інші вкладки
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

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchStatus,

    onMutate: async ({ taskId, newStatus }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });
      const previousTasks = queryClient.getQueryData(["tasks"]);

      queryClient.setQueryData(["tasks"], (old) => {
        return old?.tasks?.map((task) => {
          const newTask = task._id === taskId ? { ...task, newStatus } : task;

          return newTask;
        });
      });

      return { previousTasks };
    },

    onSuccess: (data, variables) => {
      queryClient.setQueryData(["task", variables.taskId], data);
      console.log("Task updated successfully:", data);
    },

    onError: (error, variables, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
      console.error("Failed to update task:", error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
