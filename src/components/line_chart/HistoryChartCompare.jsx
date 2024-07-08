import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip } from 'chart.js';
import { Button } from "@mui/material";
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import NightlightIcon from '@mui/icons-material/Nightlight';

// Register the components to Chart.js
Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Legend, Tooltip);

const HistoryChartCompare = ({ histories }) => {
  const [timeRange, setTimeRange] = useState('7'); // Default to 7 days

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
  };

  // Extract data for the chart
  const processHistory = (history) => {
    const filteredHistory = history.slice(0, timeRange).reverse();
    const labels = filteredHistory.map(item => {
      const date = new Date(item.created_at);
      const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if necessary
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-indexed) and pad with leading zero if necessary
      return `${day}/${month}`;
    });
    const prices = filteredHistory.map(item => item.price);
    const oldPrices = filteredHistory.map(item => item.old_price);
    return { labels, prices, oldPrices };
  };

  const datasets = histories.map((history, index) => {
    const { labels, prices, oldPrices } = processHistory(history);
    return [
      {
        label: `Sản phẩm ${index + 1} - Giá hiện tại`,
        data: prices,
        fill: false,
        borderColor: index === 0 ? '#4BC0C0' : '#36A2EB',
        tension: 0.2,
      },
      {
        label: `Sản phẩm ${index + 1} - Giá gốc`,
        data: oldPrices,
        fill: false,
        borderColor: index === 0 ? '#FF6384' : '#FFCE56',
        tension: 0.2,
      }
    ];
  }).flat();

  const labels = histories.length > 0 ? processHistory(histories[0]).labels : [];
  const data = {
    labels,
    datasets,
  };

  const options = {
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
        ticks: {
          callback: function(value, index, values) {
            return formatYAxisTick(value);
          }
        }
      },
    },
  };

  // Function to format Y-axis tick labels
  const formatYAxisTick = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000)} tỷ`; // Display in billions
    } else if (value >= 1000000) {
      return `${(value / 1000000)} triệu`; // Display in millions
    } else {
      return `${value}`; // Display as is if less than a million
    }
  };

  return (
    <div>
      <div style={{paddingTop: 20, paddingBottom: 10}}>
        <Button onClick={() => handleTimeRangeChange('7')}><ViewWeekIcon/> 7 Ngày</Button>
        <Button onClick={() => handleTimeRangeChange('30')}><NightlightIcon/> 30 Ngày</Button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default HistoryChartCompare;
