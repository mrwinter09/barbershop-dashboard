/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./styles/global.css";
import App from "./App.tsx";
import { queryClient } from "./lib/queryClient";
import { mantineProviderProps } from "./lib/mantine";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider {...mantineProviderProps}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>
);
