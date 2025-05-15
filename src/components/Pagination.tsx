interface PaginationProps {
  offset: number;
  limit: number;
  setOffset: (offset: number) => void;
  setLimit: (limit: number) => void;
  totalItems: number;
}

const Pagination = ({
  offset,
  limit,
  setOffset,
  setLimit,
  totalItems,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.floor(offset / limit) + 1;
// page shown in pagination
  const getPageRange = () => {
    const pageRange = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + maxButtons - 1);

    if (end === totalPages) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pageRange.push(i);
    }
    return pageRange;
  };

  // handle page change to load more items when clicked
  const handlePageChange = (page: number) => {
    setOffset((page - 1) * limit);
  };

  // Handle limit change to load how many items per page
  const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(event.target.value);
    setLimit(newLimit);
    setOffset(0); 
  };

  return (
    <div className="flex items-center justify-center mt-4 gap-4">
      <select
        value={limit}
        onChange={handleLimitChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="5">5 per page</option>
        <option value="10">10 per page</option>
        <option value="25">25 per page</option>
        <option value="50">50 per page</option>
      </select>

      <nav aria-label="Page navigation">
        <ul className="inline-flex -space-x-px text-base h-10">
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Previous
            </button>
          </li>

          {getPageRange().map((pageNum) => (
            <li key={pageNum}>
              <button
                onClick={() => handlePageChange(pageNum)}
                className={`flex items-center justify-center px-4 h-10 ${
                  currentPage === pageNum
                    ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            </li>
          ))}

          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
