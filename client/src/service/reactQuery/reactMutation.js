import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTask, patchStatus } from "../API/axios";

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

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchStatus,

    // ✅ Оптимістичне оновлення (опціонально)
    onMutate: async ({ taskId, status }) => {
      // Скасовуємо поточні запити для tasks
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      // Зберігаємо попередні дані для rollback
      const previousTasks = queryClient.getQueryData(["tasks"]);

      // Оптимістично оновлюємо дані
      queryClient.setQueryData(["tasks"], (old) => {
        console.log(old, "Оптимістично");

        return old?.data?.tasks?.map((task) =>
          task.id === taskId ? { ...task, status } : task
        );
      });

      return { previousTasks };
    },

    // ✅ При успіху - інвалідуємо кеш
    onSuccess: (data, variables) => {
      // Інвалідуємо і рефетчимо tasks
      // queryClient.invalidateQueries({ queryKey: ["tasks"] });

      // Або оновлюємо конкретну задачу
      queryClient.setQueryData(["task", variables.taskId], data);

      console.log("Task updated successfully:", data);
    },

    // ❌ При помилці - відкатуємо зміни
    onError: (error, variables, context) => {
      // Відновлюємо попередні дані
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }

      console.error("Failed to update task:", error);
    },

    // 🔄 Завжди виконується (успіх або помилка)
    onSettled: () => {
      // Можна додати додаткову логіку
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
