import ProtectedRoute from "../Components/ProtectedRoute";
import MainLayout from "./MainLayout";

const ProtectedLayout = () => {
  return (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  );
};
export default ProtectedLayout;
