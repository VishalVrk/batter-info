import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { ref, onValue } from "firebase/database";
import { database } from '../firebase';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)"
      },
      ticks: {
        color: "#94a3b8"
      }
    },
    y: {
      grid: {
        color: "rgba(255, 255, 255, 0.1)"
      },
      ticks: {
        color: "#94a3b8"
      }
    }
  }
};

const createChartData = (labels, data, color) => ({
  labels,
  datasets: [
    {
      data,
      borderColor: color,
      backgroundColor: `${color}33`,
      tension: 0.3,
      fill: true,
      pointRadius: 2,
    },
  ],
});

const BatteryChart = () => {
  const [batteryData, setBatteryData] = useState([]);

  useEffect(() => {
    const batteryRef = ref(database, "battery");

    onValue(batteryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBatteryData((prevData) => [
          ...prevData.slice(-9),
          {
            timestamp: new Date().toLocaleTimeString(),
            charge: data.charge,
            current: data.current,
            discharge: data.discharge,
            voltage: data.voltage
          }
        ]);
      }
    });

    return () => {
      onValue(batteryRef, () => {});
    };
  }, []);

  if (batteryData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 font-marker">
        Waiting for battery data...
      </div>
    );
  }

  const labels = batteryData.map((entry) => entry.timestamp);

  const charts = [
    {
      title: "Charge",
      data: batteryData.map((entry) => entry.charge),
      color: "#ef4444",
      unit: "%"
    },
    {
      title: "Current",
      data: batteryData.map((entry) => entry.current),
      color: "#3b82f6",
      unit: "A"
    },
    {
      title: "Discharge",
      data: batteryData.map((entry) => entry.discharge),
      color: "#22c55e",
      unit: "W"
    },
    {
      title: "Voltage",
      data: batteryData.map((entry) => entry.voltage),
      color: "#a855f7",
      unit: "V"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {charts.map((chart, index) => (
        <div 
          key={index} 
          className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-lg"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-marker text-white">{chart.title}</h3>
            <span className="text-2xl font-caveat text-slate-300">
              {batteryData[batteryData.length - 1][chart.title.toLowerCase()]}{chart.unit}
            </span>
          </div>
          <div className="h-48">
            <Line
              data={createChartData(labels, chart.data, chart.color)}
              options={chartOptions}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BatteryChart;