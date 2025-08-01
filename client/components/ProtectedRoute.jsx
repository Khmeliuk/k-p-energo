import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { refresh } from "../src/service/API/axios";

const ProtectedRoute = ({ children }) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: refresh,
    staleTime: 1000 * 60 * 5, // 5 хвилин
  });

  if (isLoading) return <div>Loading...</div>;
  if (!user || isError) {
    return <Navigate to="/Auth" />;
  }

  return children;
};

export default ProtectedRoute;
