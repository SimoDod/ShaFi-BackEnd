import Calendar from "react-calendar";
import WindowCard from "../WindowCard/WindowCard";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import getDateRange from "../../utils/date/getDateRange";
import { formatISO, isToday } from "date-fns";
import Icon from "../common/Icon/Icon";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const dates = [
  "2024-11-01",
  "2024-11-02",
  "2024-11-03",
  "2024-11-04",
  "2024-11-05",
  "2024-11-06",
  "2024-11-07",
  "2024-11-10",
  "2024-11-11",
  "2024-11-12",
  "2024-11-13",
  "2024-11-14",
  "2024-11-15",
  "2024-11-16",
  "2024-11-17",
  "2024-11-18",
  "2024-11-19",
  "2024-11-20",
  "2024-11-21",
  "2024-11-22",
  "2024-11-23",
  "2024-11-24",
  "2024-11-25",
  "2024-11-26",
  "2024-11-27",
  "2024-11-28",
  "2024-11-29",
  "2024-11-30",
  "2024-11-08",
  "2024-11-09",
];

const ReservedCalendar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pastDate, futureDate } = getDateRange(1, 13);
  const isReserved = (date: Date) =>
    dates.includes(formatISO(date, { representation: "date" }));

  return (
    <WindowCard
      heading={
        <h3 className="text text-primary text-xl">
          {t("dashboard.reservedDates")}
        </h3>
      }
      extra={
        <button className="btn btn-ghost p-2" onClick={() => navigate(0)}>
          {t("buttons.reset")}
        </button>
      }
    >
      <div className="w-full max-w-lg min-h-80 rounded-lg p-4 pt-0 font-semibold">
        <Calendar
          tileClassName={({ date }) =>
            clsx("mb-2 rounded-md", {
              "bg-error text-slate-200": isReserved(date),
              "hover:bg-base-100 hover:text-secondary": !isReserved(date),
              border: isToday(date),
            })
          }
          className="text-center space-y-5"
          prev2Label={null}
          next2Label={null}
          minDate={pastDate}
          maxDate={futureDate}
          nextLabel={
            <span className="btn btn-circle text-xl font-bold text-primary w-14 h-14">
              <Icon icon={faArrowRight} />
            </span>
          }
          prevLabel={
            <span className="btn btn-circle text-xl font-bold text-primary w-14 h-14">
              <Icon icon={faArrowLeft} />
            </span>
          }
          navigationLabel={({ label }) => (
            <div className="w-40 text-md text-center">{label}</div>
          )}
        />
      </div>
    </WindowCard>
  );
};

export default ReservedCalendar;
