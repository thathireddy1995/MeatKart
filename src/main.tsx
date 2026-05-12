import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getRouter } from "./router";
import { CartProvider } from "./hooks/use-cart";
import { LocationProvider } from "./hooks/use-location";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const queryClient = new QueryClient();
const router = getRouter();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="915891762298-p5sfvem78pa6d4a897db05lqh1miec4m.apps.googleusercontent.com">
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </LocationProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
