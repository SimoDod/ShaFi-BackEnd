import { useEffect } from "react";
import backgroundImage from "../../../assets/images/beach-background.jpg";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import InfoCalendar from "../../InfoCalendar/InfoCalendar";
import fetchAllReservationDatesThunk from "../../../store/thunks/reservation/fetchAllReservationDatesThunk";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const reservedDates = useAppSelector(
    (state) => state.reservation.reservedDates
  );

  useEffect(() => {
    dispatch(fetchAllReservationDatesThunk());
  }, [dispatch]);

  return (
    <div
      className="hero min-h-screen"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="hero-overlay bg-opacity-10" />
      <div className="hero-content p-1">
        <InfoCalendar reservedDates={reservedDates} />
      </div>
    </div>
  );
};

export default DashboardPage;
