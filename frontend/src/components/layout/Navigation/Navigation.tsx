import Dropdown from "../../common/Dropdown/Dropdown";
import { routePaths } from "../../../routerConfig";
import Icon from "../../common/Icon/Icon";
import useNavigationItems from "./useNavigationItems";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

const Navigation = () => {
  const { navMenuItems, profileMenuItems } = useNavigationItems();
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbar-start">
        <a
          className="btn btn-ghost text-xl"
          onClick={() => navigate(routePaths.ledgers.path)}
        >
          ShaFi
        </a>
      </div>
      <div className="navbar-center">
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          {navMenuItems.map(({ icon, label, onClick, isActive }) => (
            <li
              key={label}
              className={clsx(
                { "bg-primary text-base-200": isActive },
                "hover:bg-secondary hover:text-base-200 rounded mr-1 ml-1"
              )}
            >
              <a
                className="tooltip tooltip-bottom"
                data-tip={label}
                onClick={onClick}
              >
                <Icon icon={icon} className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <Dropdown
          name={<span className="text-xl font-bold">S</span>}
          className={"btn btn-circle btn-primary"}
          direction="end"
        >
          {profileMenuItems.map(({ icon, label, onClick }) => (
            <div key={label} onClick={onClick} className="justify-between">
              <a>{label}</a>
              <Icon icon={icon} />
            </div>
          ))}
        </Dropdown>
      </div>
    </div>
  );
};

export default Navigation;
