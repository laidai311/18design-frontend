import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --max-width: 1100px;
    --border-radius: 12px;

    --foreground-rgb: 0, 0, 0;
    --background-start-rgb: 214, 219, 220;
    --background-end-rgb: 255, 255, 255;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --foreground-rgb: 255, 255, 255;
      --background-start-rgb: 0, 0, 0;
      --background-end-rgb: 0, 0, 0;
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  img, picture, video, canvas, svg {
    width: auto;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }

  //@media (prefers-color-scheme: dark) {
  //  html {
  //    color-scheme: dark;
  //  }
  //}
`;
