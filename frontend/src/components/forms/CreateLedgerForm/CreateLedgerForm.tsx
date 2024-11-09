import { Form, Formik } from "formik";
import FormikField from "../../common/FormikField/FormikField";
import { ledgerColors } from "../../../utils/constants";
import { useTranslation } from "react-i18next";
import { BaseLedgerValues } from "../../../types/Ledger";
import ButtonLoader from "../../common/ButtonLoader/ButtonLoader";
import * as Yup from "yup";

type Props = {
  isLoading?: boolean;
  onSubmit: (values: BaseLedgerValues) => void;
};

const initialValues: BaseLedgerValues = {
  title: "",
  color: "",
};

const CreateLedgerForm = ({ isLoading = false, onSubmit }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center items-center w-full">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={Yup.object({
          title: Yup.string().required(t("errorValidation.required")),
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
            <FormikField name="title" label={t("common.title")} />
            <FormikField name="color" as="select">
              <option value="" disabled>
                {t("ledgersPage.selectLedgerColor")}
              </option>
              {ledgerColors.map((color) => (
                <option key={color} value={color}>
                  {t("classColors." + color)}
                </option>
              ))}
            </FormikField>
            <div className={`divider divider-${values.color} mt-8`}>
              {t("common.total")}
            </div>
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

export default CreateLedgerForm;
