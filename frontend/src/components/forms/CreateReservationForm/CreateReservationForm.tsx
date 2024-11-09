import { Form, Formik } from "formik";
import FormikField from "../../common/FormikField/FormikField";
import { useTranslation } from "react-i18next";
import ButtonLoader from "../../common/ButtonLoader/ButtonLoader";
import * as Yup from "yup";
import { BaseReservationValues } from "../../../types/Reservation";

type Props = {
  isLoading?: boolean;
  onSubmit: (values: BaseReservationValues) => void;
};

const initialValues: BaseReservationValues = {
  note: "",
  reservationStart: "",
  reservationEnd: "",
  paid: 0,
};

const CreateReservationForm = ({ isLoading = false, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          note: Yup.string().required(t("errorValidation.required")),
          reservationStart: Yup.date().required(t("errorValidation.required")),
          reservationEnd: Yup.date().required(t("errorValidation.required")),
          paid: Yup.number().required(t("errorValidation.required")),
        })}
      >
        {({ values, isValid, dirty }) => (
          <Form>
            <div className="sticky top-2 z-10 flex justify-center">
              {isLoading ? (
                <progress className="progress w-56" />
              ) : (
                <div className="h-2" />
              )}
            </div>
            <FormikField name="note" as="textarea" label={t("common.note")} />
            <FormikField
              name="reservationStart"
              type="date"
              label={t("reservationsPage.reservationStart")}
            />
            <FormikField
              name="reservationEnd"
              type="date"
              label={t("reservationsPage.reservationEnd")}
            />
            <FormikField name="paid" type="number" label={t("common.paid")} />
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
