import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Register necessary Chart.js components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCP_1TLZsGjGYHsS2me-2p0Fn1sOS4GOw8",
  authDomain: "bulkprojec.firebaseapp.com",
  databaseURL: "https://bulkprojec-default-rtdb.firebaseio.com",
  projectId: "bulkprojec",
  storageBucket: "bulkprojec.firebasestorage.app",
  messagingSenderId: "925789645395",
  appId: "1:925789645395:web:db14801943ab7fb02034a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const BatteryChart = () => {
  const [batteryData, setBatteryData] = useState([]);

  useEffect(() => {
    // Reference to the 'battery' node in Firebase
    const batteryRef = ref(db, "battery");

    // Listen for real-time updates
    onValue(batteryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBatteryData((prevData) => [
          ...prevData.slice(-9), // Keep last 9 records to prevent overflow
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

    // Cleanup function to detach listener when component unmounts
    return () => {
      onValue(batteryRef, () => {}); 
    };
  }, []);

  if (batteryData.length === 0) {
    return <p className="text-center text-gray-600">Waiting for battery data...</p>;
  }

  // Extract data for the chart
  const labels = batteryData.map((entry) => entry.timestamp);
  const chargeData = batteryData.map((entry) => entry.charge);
  const currentData = batteryData.map((entry) => entry.current);
  const dischargeData = batteryData.map((entry) => entry.discharge);
  const voltageData = batteryData.map((entry) => entry.voltage);

  const data = {
    labels,
    datasets: [
      {
        label: "Charge",
        data: chargeData,
        borderColor: "red",
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        tension: 0.3,
      },
      {
        label: "Current",
        data: currentData,
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        tension: 0.3,
      },
      {
        label: "Discharge",
        data: dischargeData,
        borderColor: "green",
        backgroundColor: "rgba(0, 255, 0, 0.3)",
        tension: 0.3,
      },
      {
        label: "Voltage",
        data: voltageData,
        borderColor: "purple",
        backgroundColor: "rgba(128, 0, 128, 0.3)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-lg font-semibold text-center mb-4">Battery Status (Live)</h2>
      <Line data={data} />
    </div>
  );
};

export default BatteryChart;
