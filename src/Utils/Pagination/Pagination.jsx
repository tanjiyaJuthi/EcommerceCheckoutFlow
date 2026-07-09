const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded border disabled:opacity-50"
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 rounded ${
                currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
            }`}
        >
            {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded border disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
