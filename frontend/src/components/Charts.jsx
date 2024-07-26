// components/Charts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const Charts = ({ selectedMonth }) => {
  const [priceRanges, setPriceRanges] = useState([]);

  useEffect(() => {
    fetchPriceRanges();
  }, [selectedMonth]);

  const fetchPriceRanges = async () => {
    try {
      const response = await axios.get(
        `/api/barchart?month=${selectedMonth}`
      );
      setPriceRanges(response.data || []);
      console.log(priceRanges);
    } catch (error) {
      console.error("Error fetching price ranges:", error);
    }
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded mb-4">
      <h2 className="text-xl font-bold mb-2">Price Range Distribution</h2>
      <BarChart
        width={1000}
        height={300}
        data={priceRanges}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priceRange" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Charts;
