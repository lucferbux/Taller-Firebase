import React from "react";
import ReactDOM from "react-dom";
import "./i18n";
import App from "./components/App";
import { AppProvider } from "./context/AppContext/AppContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";
import { FirebaseAppProvider } from "reactfire"
import { firebaseConfig } from "./utils/firebase";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AppProvider>
              <App />
          </AppProvider>
      </FirebaseAppProvider>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
