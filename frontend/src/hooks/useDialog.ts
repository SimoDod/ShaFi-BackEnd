import { useContext } from "react";
import DialogContext from "../context/dialog/DialogContext";

const useDialog = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog context must wrap the application.");
  }

  return context.openDialog;
};

export default useDialog;
