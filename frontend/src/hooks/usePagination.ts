import { useState } from "react";

export const usePagination = <T>(items: T[], itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const setItemsPerPage = (count: number) => {
    setCurrentPage(1);
    itemsPerPage = count;
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setItemsPerPage,
  };
};
