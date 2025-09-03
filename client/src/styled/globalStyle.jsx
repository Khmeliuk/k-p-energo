import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  /* HTML & Body */
  html {
    font-size: 16px; /* 1rem = 16px */
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%; /* iOS Safari */
    -ms-text-size-adjust: 100%; /* IE Mobile */
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                 'Helvetica Neue', sans-serif;
    line-height: 1.5;
    color: #333333;
    background-color: #ffffff;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
    overflow-x: hidden; /* Запобігає горизонтальному скролу */
  }

  /* Зображення */
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
    height: auto;
  }

  /* Форми */
  input,
  button,
  textarea,
  select {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* Посилання */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Списки */
  ul,
  ol {
    list-style: none;
  }

  /* Таблиці */
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* Focus стилі для доступності */
  *:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }

  *:focus:not(:focus-visible) {
    outline: none;
  }

  /* Скролбар (Webkit браузери) */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  /* Прихована доступність (screen readers) */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Переходи для кращого UX */
  * {
    transition: color 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  }

  /* Запобігання виділенню тексту для UI елементів */
  button,
  [role="button"] {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Responsive стилі */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
  }

  /* Темна тема (опціонально) */
  @media (prefers-color-scheme: dark) {
    body {
      background-color: #1a1a1a;
      /* color: #ffffff; */
    }
  }

  /* Зменшена анімація для користувачів з обмеженнями */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

    .pac-container {
    box-sizing: content-box !important;
    z-index: 1000000000 !important;
  
  }
`;
export default GlobalStyles;
