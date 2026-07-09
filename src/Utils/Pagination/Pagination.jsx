const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded border disabled:opacity-50"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {index + 1}
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
