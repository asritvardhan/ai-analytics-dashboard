import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ data }) => {
  const numericKeys = Object.keys(data[0]).filter((key) => !isNaN(data[0][key]));
  if (numericKeys.length === 0) return <p>No numeric fields to plot</p>;

  const labels = data.map((_, i) => `Row ${i + 1}`);
  const dataset = (field) => ({
    labels,
    datasets: [
      {
        label: field,
        data: data.map((row) => Number(row[field])),
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  });

  return (
    <div>
      <h2>📉 Charts</h2>
      {numericKeys.slice(0, 2).map((key) => (
        <div key={key} style={{ marginBottom: '2rem' }}>
          <h4>{key}</h4>
          <Bar data={dataset(key)} />
          <Line data={dataset(key)} />
          <Pie data={dataset(key)} />
        </div>
      ))}
    </div>
  );
};

export default Charts;
