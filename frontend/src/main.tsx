import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./output.css";
import { Provider } from "react-redux";
import { reduxStore } from "./store/store.ts";
import NotificationContextProvider from "./context/notification/NotificationContextProvider.tsx";
import DialogContextProvider from "./context/dialog/DialogContextProvider.tsx";

const store = reduxStore();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <NotificationContextProvider>
        <DialogContextProvider>
          <App />
        </DialogContextProvider>
      </NotificationContextProvider>
    </Provider>
  </StrictMode>
);
