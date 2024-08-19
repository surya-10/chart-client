import React, { useState, useEffect, useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Home from './Home';
import { myData } from '../App';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

let Dashboard = () => {
  let {energyData, setEnergyData, setMsg, msg} = useContext(myData)
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);
  let data = {
    labels: energyData.map(item => item.timing.slice(0, 10)),
    datasets: [
      {
        label: 'Energy Consumption (kWh)',
        data: energyData.map(item => item.usage),
        borderColor: 'violet',
        fill: false,
      },
    ],
  };

  let options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Energy Usage (kWh)',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Home>
    <div className="dashboard m-2">
      <h1>Real-Time Energy Dashboard</h1>
      {energyData.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No data available</p>
      )}
    </div>
    </Home>
  );
};

export default Dashboard;
