import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import { Provider } from "react-redux";
import { reduxStore } from "./store/store.ts";
import { NotificationContextProvider } from "./context/notification/NotificationContextProvider.tsx";

const store = reduxStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </Provider>
  </StrictMode>
);
