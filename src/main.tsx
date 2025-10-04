// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./store.ts";
const VITE_CLERK_PUBLISHABLE_KEY="pk_test_c2hpbmluZy1vY2Vsb3QtMS5jbGVyay5hY2NvdW50cy5kZXYk";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={VITE_CLERK_PUBLISHABLE_KEY}>
        <Router>
          <App />
        </Router>
      </ClerkProvider>
    </Provider>
  </React.StrictMode>
);