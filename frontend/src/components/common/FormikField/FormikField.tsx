import { ErrorMessage, Field } from "formik";
import { PropsWithChildren } from "react";

type Props = {
  name: string;
  label?: string;
  className?: string;
  fieldClassName?: string;
  disabled?: boolean;
  as?: "input" | "textarea" | "select";
  type?: "password" | "text" | "number" | "date" | "datetime-local";
} & PropsWithChildren;

const FormikField = ({
  name,
  label,
  children,
  className,
  disabled = false,
  as = "input",
  type = "text",
}: Props) => {
  return (
    <div className={`form-control ${className}`}>
      <label className="label">
        <span className="label-text text-base">{label}</span>
      </label>
      <Field
        as={as}
        name={name}
        className={`${as} ${as}-bordered focus:border-primary disabled:text-primary min-w-72`}
        type={type}
        disabled={disabled}
      >
        {as === "select" ? children : null}
      </Field>
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-400 text-xs"
      />
    </div>
  );
};

export default FormikField;
