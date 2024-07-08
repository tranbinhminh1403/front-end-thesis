import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip } from 'chart.js';

// Register the components to Chart.js
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip);

const HistoryChart = ({ history }) => {
  const [timeRange, setTimeRange] = useState('7'); // Default to 7 days

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Filter history based on selected time range
  const filteredHistory = history.slice(0, timeRange);

  // Extract data for the chart
  const labels = filteredHistory.map(item => item.created_at.split('T')[0]).reverse(); // Get the date part only and reverse the array
  const prices = filteredHistory.map(item => item.price).reverse();
  const oldPrices = filteredHistory.map(item => item.old_price).reverse();

  const data = {
    labels,
    datasets: [
      {
        label: 'Giá hiện tại',
        data: prices,
        fill: false,
        borderColor: '#4BC0C0',
        tension: 0.1,
      },
      {
        label: 'Giá gốc',
        data: oldPrices,
        fill: false,
        borderColor: '#FF6384',
        tension: 0.1,
      },
    ],
  };

  const options = {
    // maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Lịch sử giá',
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: false,
          text: 'Price',
        },
      },
    },
  };

  return (
    <div>
      <div>
        <button onClick={() => handleTimeRangeChange('7')}>Last 7 Days</button>
        <button onClick={() => handleTimeRangeChange('30')}>Last 30 Days</button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoryChart;
