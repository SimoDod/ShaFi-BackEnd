import {
  faGear,
  faHome,
  faLightbulb,
  faRightFromBracket,
  faUser,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { routePaths } from "../../../routerConfig";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";

type MenuItem = {
  label: string;
  icon: IconDefinition;
  isActive?: boolean;
  onClick: () => void;
};

const useNavigationItems = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logout = useLogout();
  const { pathname } = useLocation();
  const { year } = useParams();

  const navMenuItems: MenuItem[] = [
    {
      label: t(routePaths.dashboard.label),
      icon: faHome,
      isActive: routePaths.dashboard.path + year === pathname,
      onClick: () => navigate(routePaths.dashboard.path),
    },
    {
      label: t(routePaths.reservations.label),
      icon: faLightbulb,
      isActive: routePaths.reservations.path === pathname,
      onClick: () => navigate(routePaths.reservations.path),
    },
  ];

  const profileMenuItems: MenuItem[] = [
    {
      label: t("profileMenu.profile"),
      icon: faUser,
      onClick: () => {},
    },
    {
      label: t("profileMenu.settings"),
      icon: faGear,
      onClick: () => {},
    },
    {
      label: t("profileMenu.logout"),
      icon: faRightFromBracket,
      onClick: () => logout(),
    },
  ];

  return { navMenuItems, profileMenuItems };
};

export default useNavigationItems;
