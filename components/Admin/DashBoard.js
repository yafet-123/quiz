import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FiUsers, FiBookOpen, FiFileText, FiClipboard } from "react-icons/fi";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function DashBoard() {
  const [stats, setStats] = useState({
    users: 0,
    subjects: 0,
    notes: 0,
    exams: 0,
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    async function fetchStats() {
      const res = await axios.get("/api/dashboard");
      setStats(res.data.stats);

      // Convert chartData to Chart.js format
      setChartData({
        labels: res.data.chartData.map((item) => item.name),
        datasets: [
          {
            label: "Activity Count",
            data: res.data.chartData.map((item) => item.count),
            backgroundColor: "#009688",
            borderRadius: 6,
          },
        ],
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="px-6 py-20 space-y-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Users" value={stats.users} icon={<FiUsers />} color="bg-blue-500" />
        <StatCard title="Subjects" value={stats.subjects} icon={<FiBookOpen />} color="bg-green-500" />
        <StatCard title="Notes" value={stats.notes} icon={<FiFileText />} color="bg-yellow-500" />
        <StatCard title="Exams" value={stats.exams} icon={<FiClipboard />} color="bg-red-500" />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Activity Overview</h2>
        <Bar 
            data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } }} />
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className={`p-6 rounded-2xl text-white shadow-lg flex items-center ${color}`}>
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
