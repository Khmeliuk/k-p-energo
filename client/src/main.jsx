import ReactDOM from "react-dom/client";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import App from "./App";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MUIThemeProvider theme={theme}>
    <SCThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SCThemeProvider>
  </MUIThemeProvider>
);
