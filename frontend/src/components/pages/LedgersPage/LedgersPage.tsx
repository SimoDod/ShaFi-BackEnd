//TODO translate

import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../../common/Pagination/Pagination";
import WindowCard from "../../WindowCard/WindowCard";
import { routePaths } from "../../../routerConfig";
import useYearNavigation from "../../../hooks/useYearNavigation";
import { useTranslation } from "react-i18next";
import LedgerTile from "../../LedgerTile/LedgerTile";
import Modal from "../../common/Modal/Modal";
import CreateLedgerTile from "../../LedgerTile/CreateLedgerTile/CreateLedgerTile";
import { BaseLedgerValues, LedgerModal } from "../../../types/Ledger";
import CreateLedgerForm from "../../forms/CreateLedgerForm/CreateLedgerForm";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import createLedgerThunk from "../../../store/thunks/ledger/createLedgerThunk";
import fetchLedgersByYearThunk from "../../../store/thunks/ledger/fetchLedgersByYearThunk";
import { useEffect } from "react";

const LedgersPage = () => {
  const { t } = useTranslation();
  const { year, ledgerId } = useParams();
  const dispatch = useAppDispatch();
  const ledgers = useAppSelector((state) => state.ledger.ledgers);
  const userId = useAppSelector((state) => state.auth.user._id);
  const navigate = useNavigate();
  const { goToPreviousYear, goToNextYear } = useYearNavigation(
    routePaths.ledgers.path,
    year
  );

  const handleCreateLedgerSubmit = async (values: BaseLedgerValues) => {
    const { meta } = await dispatch(createLedgerThunk({ userId, ...values }));

    if (meta.requestStatus === "fulfilled") {
      navigate(`${routePaths.ledgers.path}${year}`);
    }
  };

  useEffect(() => {
    if (year) {
      dispatch(fetchLedgersByYearThunk(year));
    }
  }, [dispatch, year]);

  return (
    <>
      {ledgerId && ledgerId !== LedgerModal.CREATE && (
        <Modal onClose={() => navigate(`${routePaths.ledgers.path}${year}`)}>
          Ledger table
        </Modal>
      )}
      {ledgerId === LedgerModal.CREATE && (
        <Modal
          onClose={() => navigate(`${routePaths.ledgers.path}${year}`)}
          title={t("ledgersPage.createNewLedger")}
        >
          <CreateLedgerForm onSubmit={handleCreateLedgerSubmit} />
        </Modal>
      )}
      <div className="2xl:pr-40 2xl:pl-40">
        <WindowCard
          contentClass="flex flex-wrap justify-evenly"
          isLoading={false}
          heading={
            <h2 className="text text-2xl text-primary">
              {t("ledgersPage.ledgers")}
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
          {ledgers.map(({ color, _id, title, total }) => (
            <LedgerTile
              key={_id}
              color={color}
              onClick={() =>
                navigate(`${routePaths.ledgers.path}${year}/${_id}`)
              }
              title={title}
              total={total}
            />
          ))}
          <CreateLedgerTile
            onClick={() =>
              navigate(
                `${routePaths.ledgers.path}${year}${routePaths.ledgers.create}`
              )
            }
          />
        </WindowCard>
      </div>
    </>
  );
};

export default LedgersPage;
