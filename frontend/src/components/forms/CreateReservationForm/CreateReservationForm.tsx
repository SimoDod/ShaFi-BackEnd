import { Form, Formik } from "formik";
import FormikField from "../../common/FormikField/FormikField";
import { useTranslation } from "react-i18next";
import ButtonLoader from "../../common/ButtonLoader/ButtonLoader";
import * as Yup from "yup";
import { BaseReservationValues } from "../../../types/Reservation";
import DateRangePicker from "../../common/DateRangePicker/DateRangePicker";
import { dateFormats } from "../../../utils/date/formatDateToString";
import { format } from "date-fns";

type Props = {
  reservedDates?: string[];
  isLoading?: boolean;
  reservation?: BaseReservationValues;
  onSubmit: (values: BaseReservationValues) => void;
};

const initialValues: BaseReservationValues = {
  note: "",
  reservationDate: ["", ""],
  paid: 0,
};

const CreateReservationForm = ({
  isLoading = false,
  reservedDates = [],
  reservation,
  onSubmit,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={reservation ? reservation : initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          note: Yup.string().required(t("errorValidation.required")),
          reservationDate: Yup.array()
            .of(Yup.date().required(t("errorValidation.required")))
            .min(1, t("errorValidation.required"))
            .required(t("errorValidation.required")),
          paid: Yup.number().required(t("errorValidation.required")),
        })}
      >
        {({ values, isValid, dirty, setFieldValue }) => (
          <Form className="flex flex-col gap-2">
            <div className="sticky top-2 z-10 flex justify-center">
              {isLoading ? (
                <progress className="progress w-56" />
              ) : (
                <div className="h-2" />
              )}
            </div>
            <FormikField name="note" as="textarea" label={t("common.note")} />
            <FormikField name="paid" type="number" label={t("common.paid")} />
            <DateRangePicker
              name="reservationDate"
              label={t("reservationsPage.reservationDate")}
              dateFormat={dateFormats.yearFirstLine}
              value={values.reservationDate}
              excludeDates={reservedDates.map((date) => new Date(date))}
              onChange={(dates) => {
                const [start, end] = dates;
                setFieldValue("reservationDate", [
                  start ? format(start, dateFormats.yearFirstLine) : "",
                  end ? format(end, dateFormats.yearFirstLine) : "",
                ]);
              }}
            />
            <ButtonLoader
              type="submit"
              className={`btn-primary mt-4 w-full ${(!isValid || !dirty) && "btn-disabled"}`}
            >
              {t("buttons.create")}
            </ButtonLoader>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateReservationForm;
