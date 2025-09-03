import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

const MainPage = () => {
  const queryClient = useQueryClient();

  // Використовуємо об'єктну форму для useQuery
  const { data: userData } = useQuery({
    queryKey: ["user"], // Використовуємо об'єктну форму
    enabled: false, // Не виконуємо fetch, якщо дані не змінювались
    initialData: () => queryClient.getQueryData(["user"]), // Початкові дані з кешу
  });

  return userData ? <Navigate to="/task" /> : <Navigate to="/auth" />;
};

export default MainPage;
