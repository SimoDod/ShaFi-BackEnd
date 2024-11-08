import { useNavigate } from "react-router-dom";
import { clearAuthSession } from "../utils/authentication/authentication";
import { routePaths } from "../routerConfig";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuthSession();
    navigate(routePaths.authentication.path);
  };

  return logout;
};

export default useLogout;
