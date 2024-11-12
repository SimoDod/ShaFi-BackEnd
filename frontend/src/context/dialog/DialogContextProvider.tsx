import { useState, PropsWithChildren } from "react";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faTrashCan,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import DialogContext, { DialogConfig, DialogType } from "./DialogContext";
import Modal from "../../components/common/Modal/Modal";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import Icon from "../../components/common/Icon/Icon";

const dialogIcons: Record<DialogType, IconDefinition> = {
  confirm: faCheckCircle,
  delete: faTrashCan,
  info: faExclamationCircle,
  warning: faExclamationTriangle,
};

const generateDefaultConfig = (
  t: TFunction
): Record<DialogType, DialogConfig> => ({
  confirm: {
    content: t("dialog.confirmAction"),
    onConfirm: () => undefined,
    okText: t("buttons.confirm"),
    cancelText: t("buttons.close"),
  },
  delete: {
    content: t("dialog.confirmDelete"),
    onConfirm: () => undefined,
    okText: t("buttons.delete"),
    cancelText: t("buttons.close"),
  },
  info: {
    onConfirm: () => undefined,
    cancelText: t("buttons.close"),
  },
  warning: {
    onConfirm: () => undefined,
    cancelText: t("buttons.close"),
  },
});

const DialogContextProvider = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const closeDialog = () => setIsOpen(false);
  const [dialogConfig, setDialogConfig] = useState(
    generateDefaultConfig(t).confirm
  );
  const [dialogType, setDialogType] = useState<DialogType>("confirm");

  const openDialog = (type: DialogType, config?: DialogConfig) => {
    setDialogType(type);
    setIsOpen(true);

    setDialogConfig({ ...generateDefaultConfig(t)[type], ...config });
  };

  return (
    <DialogContext.Provider value={{ openDialog }}>
      {isOpen && (
        <Modal
          title={<Icon icon={dialogIcons[dialogType]} />}
          actions={
            <div className="flex justify-end gap-2">
              <button className="btn btn-neutral" onClick={closeDialog}>
                {dialogConfig.cancelText}
              </button>
              {(dialogType === "confirm" || dialogType === "delete") && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dialogConfig.onConfirm();
                    closeDialog();
                  }}
                >
                  {dialogConfig.okText}
                </button>
              )}
            </div>
          }
          onClose={closeDialog}
        >
          <div className="container m-2 min-w-72">{dialogConfig.content}</div>
          <div className="divider divider-primary mb-0" />
        </Modal>
      )}
      {children}
    </DialogContext.Provider>
  );
};

export default DialogContextProvider;
