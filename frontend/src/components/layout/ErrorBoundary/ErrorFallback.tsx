import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { routePaths } from "../../../routerConfig";

export type ErrorFallbackProps = {
  resetError?: () => void;
  errorMessage?: "errorMessage" | "wrongPath";
};

const ErrorFallback = ({
  resetError,
  errorMessage = "errorMessage",
}: ErrorFallbackProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleErrorReset = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    resetError && resetError();

    navigate(routePaths.dashboard.path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
      <div className="mockup-window border-base-300 border w-11/12 sm:w-96 mb-60">
        <div className="border-base-300 flex justify-center border-t px-6 py-16">
          <h1 className="text-xl font-bold text-error text-center">
            {t(`errorPage.${errorMessage}`)}
          </h1>
        </div>
        <button className="btn btn-primary mt-6" onClick={handleErrorReset}>
          {t("buttons.backButton")}
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
