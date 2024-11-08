import {
  Children,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import Icon from "../Icon/Icon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon?: IconDefinition;
  name?: ReactNode;
  className?: string;
  direction?: "left" | "right" | "bottom" | "top" | "end" | "start";
} & PropsWithChildren;

const Dropdown = ({
  children,
  name,
  icon,
  className,
  direction = "start",
}: Props) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const handleCloseDropdown = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseDropdown);

    return () => {
      document.removeEventListener("click", handleCloseDropdown);
    };
  }, []);

  return (
    <details className={`dropdown dropdown-${direction}`} ref={detailsRef}>
      <summary tabIndex={0} role="button" className={className}>
        {icon && <Icon icon={icon} />}
        {name && name}
      </summary>
      <ul className="menu menu-sm dropdown-content bg-base-200 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {Children.map(children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </details>
  );
};

export default Dropdown;
