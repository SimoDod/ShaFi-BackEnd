import { PropsWithChildren, ReactNode } from "react";

type Props = {
  isLoading?: boolean;
  heading?: ReactNode;
  extra?: ReactNode;
  contentClass?: string;
} & PropsWithChildren;

const WindowCard = ({
  isLoading = false,
  heading,
  extra,
  children,
  contentClass,
}: Props) => {
  return (
    <div className="mockup-window shadow-xl bg-base-300 mb-10">
      <div className="flex justify-between items-center flex-wrap pl-6 pr-6 mb-4">
        {heading}
        {extra}
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <span className="loading loading-bars loading-lg mt-52 mb-40" />
        </div>
      ) : (
        <div className={contentClass}>{children}</div>
      )}
    </div>
  );
};

export default WindowCard;
