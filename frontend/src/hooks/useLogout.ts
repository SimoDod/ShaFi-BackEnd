import { useNavigate } from "react-router-dom";
import { clearAuthSession } from "../utils/authentication/authentication";
import { routePaths } from "../routerConfig";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuthSession();
    navigate(routePaths.dashboard.path);
  };

  return logout;
};

export default useLogout;
