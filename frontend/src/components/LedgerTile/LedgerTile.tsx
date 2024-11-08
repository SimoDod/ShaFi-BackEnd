import { useTranslation } from "react-i18next";
import LedgerTileWrapper from "./LedgerTileWrapper/LedgerTileWrapper";
import { ledgerColors } from "../../utils/constants";

type Props = {
  title: string;
  total: string | number;
  color: (typeof ledgerColors)[number] | "";
  onClick: () => void;
};

const LedgerTile = ({ title, total, onClick, color = "accent" }: Props) => {
  const { t } = useTranslation();

  return (
    <LedgerTileWrapper onClick={onClick}>
      <h2 className="card-title text-primary text-lg">{title}</h2>
      <div className={`divider divider-${color} text-lg`}>
        {t("common.total")}
      </div>
      <div className="text-xl">{total}</div>
    </LedgerTileWrapper>
  );
};

export default LedgerTile;
