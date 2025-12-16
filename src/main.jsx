import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./App.css";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import {I18nextProvider} from 'react-i18next'; // Provider for internationalization (i18n)
import i18n from './i18n'; // i18n configuration file

// Conditionally import RTL styles
if (document.documentElement.dir === "rtl") {
  import("./App-rtl.css")
    .then(() => console.log("RTL styles applied"))
    .catch((err) => console.error("Error loading RTL styles:", err));
}

// Simple version check to force reload when new build is deployed
(async function checkVersion() {
  try {
    const res = await fetch(`/version.txt?ts=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return;
    const latest = (await res.text()).trim();
    const current = localStorage.getItem('appVersion');
    if (current && current !== latest) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
      return;
    }
    localStorage.setItem('appVersion', latest);
  } catch (err) {
    console.error('Version check failed', err);
  }
})();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ContextProvider>
      <I18nextProvider i18n={i18n}>
          <ToastContainer />
          <App />
          </I18nextProvider>
      </ContextProvider>
    </AuthProvider>
  </StrictMode>
);
