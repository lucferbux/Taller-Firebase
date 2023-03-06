import React from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import App from "./components/App";
import { AppProvider } from "./context/AppContext/AppContext";
import "./main.css";
import { HelmetProvider } from "react-helmet-async";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./utils/firebase";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <App />
        </FirebaseAppProvider>
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);
