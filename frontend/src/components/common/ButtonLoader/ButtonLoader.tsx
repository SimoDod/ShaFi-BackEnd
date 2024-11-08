import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { PropsWithChildren } from "react";
import Icon from "../Icon/Icon";
import clsx from "clsx";

type Props = {
  isLoading?: boolean;
  className?: string;
  icon?: IconDefinition;
  type?: "submit" | "button";
  onClick?: () => void;
} & PropsWithChildren;

const ButtonLoader = ({
  isLoading = false,
  className,
  icon,
  children,
  type = "button",
  onClick,
}: Props) => {
  return (
    <button
      disabled={isLoading}
      className={clsx("btn", className)}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="loading loading-bars loading-md" />
      ) : (
        <>
          {icon && <Icon icon={icon} />}
          {children && children}
        </>
      )}
    </button>
  );
};

export default ButtonLoader;
