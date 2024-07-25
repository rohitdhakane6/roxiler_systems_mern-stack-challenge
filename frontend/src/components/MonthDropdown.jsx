import React from "react";

const MonthDropdown = ({ selectedMonth, setSelectedMonth }) => {
  const months = [
    { name: "January", number: 1 },
    { name: "February", number: 2 },
    { name: "March", number: 3 },
    { name: "April", number: 4 },
    { name: "May", number: 5 },
    { name: "June", number: 6 },
    { name: "July", number: 7 },
    { name: "August", number: 8 },
    { name: "September", number: 9 },
    { name: "October", number: 10 },
    { name: "November", number: 11 },
    { name: "December", number: 12 }
  ];

  return (
    <select
      value={selectedMonth}
      onChange={(e) => setSelectedMonth(Number(e.target.value))}
      className="border p-2 rounded"
    >
      {months.map((month) => (
        <option key={month.number} value={month.number}>
          {month.name}
        </option>
      ))}
    </select>
  );
};

export default MonthDropdown;
