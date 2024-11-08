import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useYearNavigation = (path: string, year?: number | string) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!year) {
      navigate(path + new Date().getFullYear());
    }
  }, [navigate, path, year]);

  const goToPreviousYear = () => navigate(`${path}${Number(year) - 1}`);
  const goToNextYear = () => navigate(`${path}${Number(year) + 1}`);

  return { goToPreviousYear, goToNextYear };
};

export default useYearNavigation;
