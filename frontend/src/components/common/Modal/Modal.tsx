import { createPortal } from "react-dom";
import Icon from "../Icon/Icon";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
  title?: ReactNode;
  actions?: ReactNode;
  centered?: boolean;
  onClose: () => void;
} & PropsWithChildren;
{
  /* <div className="modal-box w-full max-w-3xl p-4 sm:max-w-full sm:p-4"></div> */
}
const Modal = ({
  onClose,
  title,
  children,
  actions,
  centered = false,
}: Props) =>
  createPortal(
    <div className={`modal modal-open z-40 ${!centered && "items-start"}`}>
      <div
        className={`modal-box max-w-fit xxs:w-full xxxs:w-full ${!centered && "mt-40 xxxs:mt-20"}`}
      >
        <div className="flex justify-between h-8">
          <h3 className="font-bold text-lg">{title}</h3>
          <button onClick={onClose} className="btn btn-link p-1 items-start">
            <Icon
              icon={faX}
              className="text-primary h-4 hover:text-secondary"
            />
          </button>
        </div>
        <div className="modal-content mt-4">{children}</div>
        <div className="modal-actions mt-4">{actions}</div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>,
    document.body
  );

export default Modal;
