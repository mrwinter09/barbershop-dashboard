/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./styles/global.css";
import App from "./App.tsx";
import { mantineProviderProps } from "./lib/mantine";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider {...mantineProviderProps}>
      <App />
    </MantineProvider>
  </StrictMode>
);
