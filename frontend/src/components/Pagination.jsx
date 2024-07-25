import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="flex justify-between items-center py-4">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-4 py-2 rounded ${currentPage <= 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
      >
        Previous
      </button>
      <span className="text-white">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-4 py-2 rounded ${currentPage >= totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
