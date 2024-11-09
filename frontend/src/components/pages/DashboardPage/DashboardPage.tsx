import backgroundImage from "../../../assets/images/beach-background.jpg";
import InfoCalendar from "../../InfoCalendar/InfoCalendar";

const DashboardPage = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay bg-opacity-10" />
      <div className="hero-content p-1">
        <InfoCalendar />
      </div>
    </div>
  );
};

export default DashboardPage;
