type Props = {
  previousPage: () => void;
  nextPage: () => void;
  totalPages?: number;
  currentPage: number;
  mode?: "page" | "total";
};

const Pagination = ({
  previousPage,
  nextPage,
  totalPages,
  currentPage,
  mode = "total",
}: Props) => (
  <div className="join">
    <button className="join-item btn hover:btn-primary" onClick={previousPage}>
      «
    </button>
    <button className="join-item btn disabled">
      {currentPage} {mode === "total" && ` / ${totalPages}`}
    </button>
    <button className="join-item btn hover:btn-primary" onClick={nextPage}>
      »
    </button>
  </div>
);
export default Pagination;
