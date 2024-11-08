import { createContext } from "react";

export type NotificationType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "alert";

const NotificationContext = createContext<{
  openNotification: (type: NotificationType, message: string) => void;
}>({
  openNotification: () => {},
});

export default NotificationContext;
