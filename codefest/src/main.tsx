import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from "react"
import ReactDOM from "react-dom/client"
import { AuthProvider } from "./context/AuthProvider";
import { AppRoutes } from "./router/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  </React.StrictMode>
);
