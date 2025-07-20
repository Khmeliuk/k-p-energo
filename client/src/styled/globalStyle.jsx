import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  .pac-container {
    font-size: 16px;
    z-index:2500;
    border: 1px solid #ccc;
  }

  .pac-item {
    padding: 8px;
    cursor: pointer;
  }

  .pac-item:hover {
    background-color: #e0e0e0;
  }
`;
