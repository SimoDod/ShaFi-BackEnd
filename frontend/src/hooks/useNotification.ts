import { useContext } from "react";
import NotificationContext from "../context/notification/NotificationContext";

const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("Notification context must wrap the application.");
  }

  return context.openNotification;
};

export default useNotification;
