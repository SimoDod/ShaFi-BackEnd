import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  icon: IconDefinition;
  className?: string;
};

const Icon = ({ icon, className }: Props) => (
  <FontAwesomeIcon icon={icon} className={className} />
);

export default Icon;
