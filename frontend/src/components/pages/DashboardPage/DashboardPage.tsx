import { useNavigate } from "react-router-dom";
import { routePaths } from "../../../routerConfig";
import backgroundImage from "../../../assets/images/daisyui-background.webp";
import ReservedCalendar from "../../ReservedCalendar/ReservedCalendar";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../common/Icon/Icon";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="fixed top-12 right-12">
        <button
          onClick={() => navigate(routePaths.login.path)}
          className="btn btn-ghost btn-circle"
        >
          <Icon icon={faGear} />
        </button>
      </div>
      <div className="hero-overlay bg-opacity-40" />
      <div className="hero-content p-1">
        <ReservedCalendar />
      </div>
    </div>
  );
};

export default DashboardPage;
