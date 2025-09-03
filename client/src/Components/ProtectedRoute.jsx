import { Navigate } from "react-router-dom";
import { useRefreshQuery } from "../service/reactQuery/reactQuery";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading, isError } = useRefreshQuery();

  if (isLoading) return <div>Loading...</div>;
  if (!user || isError) {
    return <Navigate to="/Auth" />;
  }

  return children;
};

export default ProtectedRoute;
