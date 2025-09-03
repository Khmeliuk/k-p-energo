import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthForm from "./views/AuthForm";
import GlobalStyles from "./styled/globalStyle";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./layout/ProtectionLayout";
import TaskComponent from "./Components/TaskComponent";

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
          <Route path="/" element={<ProtectedLayout />}>
            <Route path="tasks" element={<TaskComponent />} />
            {/* <Route path="projects" element={<ProjectsComponent />} />
            <Route path="team" element={<TeamComponent />} /> */}
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  );
}

export default App;
