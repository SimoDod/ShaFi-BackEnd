import { PropsWithChildren } from "react";

type Props = {
  onClick: () => void;
} & PropsWithChildren;

const LedgerTileWrapper = ({ onClick, children }: Props) => {
  return (
    <div
      onClick={onClick}
      className="card bg-base-100 m-2 mb-10 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      <div className="card-body w-64 h-52 items-center justify-center text-center p-8">
        {children}
      </div>
    </div>
  );
};

export default LedgerTileWrapper;
