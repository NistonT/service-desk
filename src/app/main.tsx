import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MainLayout } from "./layout/MainLayout";
import { ReduxProvider, RouterProvider } from "./providers";
import { Router } from "./router";
import "./style/index.css";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider>
    <RouterProvider>
      <StrictMode>
        <MainLayout>
          <Router />
        </MainLayout>
      </StrictMode>
    </RouterProvider>
  </ReduxProvider>,
);
