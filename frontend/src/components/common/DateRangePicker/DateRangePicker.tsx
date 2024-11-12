import ReactDatePicker from "react-datepicker";
import { parse, eachDayOfInterval, isSameDay } from "date-fns";
import { dateFormats } from "../../../utils/date/formatDateToString";
import { ErrorMessage } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import useNotification from "../../../hooks/useNotification";
import { useTranslation } from "react-i18next";

type Props = {
  name: string;
  value: [string, string];
  label: string;
  dateFormat: string;
  minDate?: Date;
  maxDate?: Date;
  excludeDates?: Date[];
  onChange: (dates: [Date | null, Date | null]) => void;
};

const DateRangePicker = ({
  name,
  value,
  label,
  dateFormat,
  minDate,
  maxDate,
  excludeDates = [],
  onChange,
}: Props) => {
  const openNotification = useNotification();
  const { t } = useTranslation();
  const startDate = value[0]
    ? parse(value[0], dateFormats.yearFirstLine, new Date())
    : undefined;
  const endDate = value[1]
    ? parse(value[1], dateFormats.yearFirstLine, new Date())
    : undefined;

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;

    if (start && end) {
      const selectedRange = eachDayOfInterval({ start, end });

      const hasDisabledDate = selectedRange.some((day) =>
        excludeDates.some((disabledDate) => isSameDay(day, disabledDate))
      );

      if (hasDisabledDate) {
        openNotification("warning", t("notifications.dateReserved"));
        return;
      }
    }

    onChange(dates);
  };

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text text-base">{label}</span>
      </label>
      <ReactDatePicker
        name={name}
        className="input focus:border-primary border border-neutral min-w-60"
        selected={startDate}
        onChange={handleChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        dateFormat={dateFormat}
        autoComplete="off"
        minDate={minDate}
        maxDate={maxDate}
        excludeDates={excludeDates}
        isClearable
        calendarClassName="date-range-picker"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-400 text-xs"
      />
    </div>
  );
};

export default DateRangePicker;
