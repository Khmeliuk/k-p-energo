import { StrictMode, useEffect } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthForm from "./Components/views/AuthForm";
import { GlobalStyles } from "./styled/globalStyle";
import MainPage from "./Components/views/MainPage";
import { Navigate, Route, Routes } from "react-router-dom";
import TaskComponent from "./Components/TaskComponent";
import ProtectedRoute from "../components/ProtectedRoute";

const queryClient = new QueryClient();

function App() {
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
