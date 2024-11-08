import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Icon from "../../common/Icon/Icon";
import LedgerTileWrapper from "../LedgerTileWrapper/LedgerTileWrapper";

type Props = {
  onClick: () => void;
};

const CreateLedgerTile = ({ onClick }: Props) => {
  return (
    <LedgerTileWrapper onClick={onClick}>
      <Icon icon={faPlusCircle} className="text-7xl" />
    </LedgerTileWrapper>
  );
};

export default CreateLedgerTile;
