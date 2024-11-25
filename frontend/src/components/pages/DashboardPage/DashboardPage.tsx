import { useEffect, useState } from "react";
import backgroundImage from "../../../assets/images/beach-background.jpg";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import InfoCalendar from "../../InfoCalendar/InfoCalendar";
import fetchAllReservationDatesThunk from "../../../store/thunks/reservation/fetchAllReservationDatesThunk";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const reservedDates = useAppSelector(
    (state) => state.reservation.reservedDates
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      const { meta } = await dispatch(fetchAllReservationDatesThunk());

      if (meta.requestStatus === "fulfilled") {
        setError(false);
      }

      if (meta.requestStatus === "rejected") {
        setError(true);
      }
    };
    fetchReservations();
  }, [dispatch]);

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay bg-opacity-10" />
      <div className="hero-content p-1">
        {!error && <InfoCalendar reservedDates={reservedDates} />}
      </div>
    </div>
  );
};

export default DashboardPage;
