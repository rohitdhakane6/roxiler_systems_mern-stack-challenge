import React from "react";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search transactions..."
      className="border p-2 rounded"
    />
  );
};

export default SearchBox;
