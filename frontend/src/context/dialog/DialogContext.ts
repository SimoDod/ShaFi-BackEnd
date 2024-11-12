import { createContext, ReactNode } from "react";

export type DialogType = "confirm" | "info" | "warning" | "delete";
export type DialogConfig = {
  content?: ReactNode;
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
};

const DialogContext = createContext<{
  openDialog: (type: DialogType, config?: DialogConfig) => void;
}>({
  openDialog: () => {},
});

export default DialogContext;
