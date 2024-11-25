import { useTranslation } from "react-i18next";
import Pagination from "../../common/Pagination/Pagination";
import ReservationsTable from "../../ReservationsTable/ReservationsTable";
import WindowCard from "../../WindowCard/WindowCard";
import useYearNavigation from "../../../hooks/useYearNavigation";
import { routePaths } from "../../../routerConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import Search from "../../common/Search/Search";
import Icon from "../../common/Icon/Icon";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../common/Modal/Modal";
import {
  BaseReservationValues,
  ReservationModal,
} from "../../../types/Reservation";
import CreateReservationForm from "../../forms/CreateReservationForm/CreateReservationForm";
import createReservationThunk from "../../../store/thunks/reservation/createReservationThunk";
import { useEffect, useState } from "react";
import fetchReservationByYearThunk from "../../../store/thunks/reservation/fetchReservationByYearThunk";
import fetchAllReservationDatesThunk from "../../../store/thunks/reservation/fetchAllReservationDatesThunk";
import { getReservationByIdAndExcludeReservedDates } from "../../../store/slices/reservationSlice";
import updateReservationThunk from "../../../store/thunks/reservation/updateReservationThunk";
import filterReservationsByValue from "../../../utils/reservation/filterReservationsByValue";

const ReservationsPage = () => {
  const { t } = useTranslation();
  const { year, reservationId } = useParams();
  const dispatch = useAppDispatch();
  const { reservations, reservedDates, reservedDatesWithExclusion } =
    useAppSelector((state) => state.reservation);
  const userId = useAppSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const { goToPreviousYear, goToNextYear } = useYearNavigation(
    routePaths.reservations.path,
    year
  );
  const isReservationUpdate =
    reservationId && reservationId !== ReservationModal.CREATE;
  const isReservationCreate = reservationId === ReservationModal.CREATE;

  useEffect(() => {
    dispatch(fetchAllReservationDatesThunk());

    if (isReservationUpdate) {
      dispatch(getReservationByIdAndExcludeReservedDates(reservationId));
    }
  }, [dispatch, isReservationUpdate, reservationId]);

  const handleSubmit = async (values: BaseReservationValues) => {
    const reservationWithUserId = { userId, ...values };

    const { meta } = await dispatch(
      isReservationUpdate
        ? updateReservationThunk({ ...reservationWithUserId, reservationId })
        : createReservationThunk(reservationWithUserId)
    );

    if (meta.requestStatus === "fulfilled") {
      navigate(`${routePaths.reservations.path}${year}`);
    }
  };

  useEffect(() => {
    if (year) {
      dispatch(fetchReservationByYearThunk(year));
    }
  }, [dispatch, year]);

  return (
    <>
      {isReservationUpdate && (
        <Modal
          onClose={() => navigate(`${routePaths.reservations.path}${year}`)}
          title={t("reservationsPage.editReservation")}
        >
          <CreateReservationForm
            onSubmit={handleSubmit}
            reservation={reservations.find(({ _id }) => _id === reservationId)}
            reservedDates={reservedDatesWithExclusion}
          />
        </Modal>
      )}
      {isReservationCreate && (
        <Modal
          onClose={() => navigate(`${routePaths.reservations.path}${year}`)}
          title={t("reservationsPage.createNewReservation")}
        >
          <CreateReservationForm
            onSubmit={handleSubmit}
            reservedDates={reservedDates}
          />
        </Modal>
      )}
      <div className="2xl:pr-40 2xl:pl-40">
        <WindowCard
          isLoading={false}
          heading={
            <h2 className="text text-2xl text-primary">
              {t("reservationsPage.reservations")}
            </h2>
          }
          extra={
            <Pagination
              nextPage={goToNextYear}
              previousPage={goToPreviousYear}
              currentPage={Number(year)}
              mode="page"
            />
          }
        >
          <div className="flex justify-between mr-6 ml-6 mb-4">
            <button
              className="btn btn-primary hover:btn-secondary"
              onClick={() =>
                navigate(
                  `${routePaths.reservations.path}${year}${routePaths.reservations.create}`
                )
              }
            >
              <Icon icon={faPlusCircle} />
            </button>
            <Search onSearch={(value) => setSearchValue(value)} />
          </div>
          <ReservationsTable
            reservations={filterReservationsByValue(searchValue, reservations)}
          />
        </WindowCard>
      </div>
    </>
  );
};

export default ReservationsPage;
