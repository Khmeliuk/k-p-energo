import { StrictMode, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { GlobalStyles } from "./styled/globalStyle";
import MainPage from "./Components/views/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthForm from "./Components/AuthForm";
import TaskComponent from "./Components/TaskComponent";
import ProtectedRoute from "../components/ProtectedRoute";
import { refresh } from "./service/API/asios";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    queryClient
      .fetchQuery({
        queryKey: ["user"],
        queryFn: refresh,
      })
      .catch((err) => {
        console.error("Неавторизовано:", err);
      });
  }, [queryClient]);
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <TaskComponent />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
