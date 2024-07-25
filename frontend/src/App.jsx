import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import MonthDropdown from "./components/MonthDropdown";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";
import Charts from "./components/Charts.jsx";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [searchQuery, setSearchQuery] = useState("");
  const [statistics, setStatistics] = useState({
    notSoldItems: 0,
    saleAmount: 0,
    soldItems: 0,
  });

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
  }, [currentPage, selectedMonth, searchQuery]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `/api/transactions?month=${selectedMonth}&page=${currentPage}&search=${searchQuery}`
      );

      setTransactions(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `/api/statistics?month=${selectedMonth}`
      );
      console.log(response.data[0]);

      setStatistics(response.data[0]);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 class="my-4 inline-block text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight dark:text-slate-200">
        Transctions Dashboard
      </h1>
      <div className="flex justify-between items-center mb-4">
        <MonthDropdown
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      <TransactionsTable transactions={transactions} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
      <div className="bg-gray-800 text-white p-4 rounded mb-4">
        <h2 className="text-xl font-bold mb-2">Transaction Statistics</h2>
        <div className="flex justify-between">
          <div>
            <p>Total Sales: {statistics.saleAmount.toFixed(2)}</p>
            <p>Total Sold Items: {statistics.soldItems}</p>
            <p>Total Not Sold Items: {statistics.notSoldItems}</p>
          </div>
        </div>
      </div>

      <Charts selectedMonth={selectedMonth} />
    </div>
  );
};

export default App;
