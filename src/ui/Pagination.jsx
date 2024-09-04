import { useSearchParams } from "react-router-dom";
import PaginationNumbers from "./PaginationNumbers";

export default function Pagination({
  count,
  pageSize = 10,
  className,
  param = "page"
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const lastPage = Math.ceil(count / pageSize);
  const currentPage = searchParams.get(param) || 1;

  const atStart = currentPage <= 1;
  const atEnd = currentPage >= lastPage;

  function handlePrev(event) {
    event.preventDefault();
    !atStart &&
      setSearchParams((prev) => ({ ...prev, [param]: currentPage - 1 }));
  }

  function handleNext(event) {
    event.preventDefault();
    !atEnd &&
      setSearchParams((prev) => ({ ...prev, [param]: +currentPage + 1 }));
  }

  function handleFirstPage(event) {
    event.preventDefault();
    setSearchParams((prev) => ({ ...prev, [param]: 1 }));
  }

  function handleLastPage(event) {
    event.preventDefault();
    setSearchParams((prev) => ({ ...prev, [param]: lastPage }));
  }

  return (
    <div className={`pagination_component mt-4 ${className}`}>
      <div className="paginator_btns">
        <button onClick={handleFirstPage}>
          <i className="fa-regular fa-angles-left"></i>
        </button>
        <button onClick={handlePrev}>
          <i className="fa-regular fa-angle-left"></i>
        </button>
      </div>
      <PaginationNumbers
        currentPage={currentPage}
        lastPage={lastPage}
        param={param}
        setSearchParams={setSearchParams}
      />
      <div className="paginator_btns">
        <button onClick={handleNext}>
          <i className="fa-regular fa-angle-right"></i>
        </button>
        <button onClick={handleLastPage}>
          <i className="fa-regular fa-angles-right"></i>
        </button>
      </div>
    </div>
  );
}
