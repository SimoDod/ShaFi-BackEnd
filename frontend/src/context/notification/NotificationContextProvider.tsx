import { useState, useEffect, PropsWithChildren } from "react";
import Icon from "../../components/common/Icon/Icon";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faXmarkCircle,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import NotificationContext, { NotificationType } from "./NotificationContext";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { clearMessage } from "../../store/slices/notificationSlice";
import { Transition } from "@headlessui/react";

const notificationIcons: Record<NotificationType, IconDefinition> = {
  success: faCheckCircle,
  alert: faInfoCircle,
  error: faXmarkCircle,
  info: faExclamationCircle,
  warning: faExclamationTriangle,
};

const notificationDisplayDuration = 4000;
const fadeOutDuration = 500;

const NotificationContextProvider = ({ children }: PropsWithChildren) => {
  const storeMessage = useAppSelector((state) => state.notification.message);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotificationType>("alert");
  const [isFadingOut, setIsFadingOut] = useState(false);
  const dispatch = useAppDispatch();

  const openNotification = (type: NotificationType, message: string) => {
    setType(type);
    setMessage(message);
    setIsFadingOut(false);
  };

  useEffect(() => {
    if (message) {
      const fadeOutTimeoutId = setTimeout(
        () => setIsFadingOut(true),
        notificationDisplayDuration
      );

      const clearTimeoutId = setTimeout(
        () => setMessage(""),
        notificationDisplayDuration + fadeOutDuration
      );

      return () => {
        clearTimeout(fadeOutTimeoutId);
        clearTimeout(clearTimeoutId);
      };
    }
  }, [message]);

  useEffect(() => {
    if (storeMessage) {
      openNotification("error", storeMessage);

      const reduxClearTimeout = setTimeout(() => {
        dispatch(clearMessage());
      }, notificationDisplayDuration + fadeOutDuration);

      return () => clearTimeout(reduxClearTimeout);
    }
  }, [dispatch, storeMessage]);

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      <Transition
        show={!!message && !isFadingOut}
        appear
        enter={`transition-opacity duration-${fadeOutDuration}`}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave={`transition-opacity duration-${fadeOutDuration}`}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          role="alert"
          className={`alert alert-${type} fixed right-4 top-4 z-50 max-w-80`}
        >
          <Icon icon={notificationIcons[type]} />
          <span>{message}</span>
        </div>
      </Transition>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContextProvider;
