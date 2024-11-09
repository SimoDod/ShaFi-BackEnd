import { PropsWithChildren } from "react";
import Icon from "../Icon/Icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
  onSearch: (value: string) => void;
  onCriteriaSelect?: (value: string) => void;
  criteria: boolean;
  searchCriteria: string;
  criteriaOptions: string[];
} & PropsWithChildren;

const Search = ({
  onClick,
  onSearch,
  onCriteriaSelect,
  criteria = false,
  searchCriteria = "",
  criteriaOptions = [],
}: Props) => {
  return (
    <div className="join">
      <input
        className="input input-bordered join-item w-50 focus:border-primary"
        onChange={({ target }) => onSearch(target.value)}
        placeholder="Search"
      />
      {criteria && (
        <select
          value={searchCriteria as string}
          onChange={({ target }) =>
            onCriteriaSelect && onCriteriaSelect(target.value)
          }
          className="select select-bordered focus:border-primary join-item"
        >
          <option value="" />
          {Object.values(criteriaOptions).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      <button onClick={onClick} className="btn btn-primary join-item">
        <Icon icon={faSearch} />
      </button>
    </div>
  );
};

export default Search;
