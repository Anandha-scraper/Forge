"use client";

import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import "@/src/styles/components/template/participation-chart.css";

Chart.register(ArcElement, Tooltip, Legend);

const COLORS = ["#f87b1b", "#11224e", "#c9d98a", "#b9a5df", "#2b9d73"];

export default function ParticipationChart({ data = [] }) {
  const chartData = {
    labels: data.map((item) => item.label),
    datasets: [{
      data: data.map((item) => item.completed ?? item.value ?? 0),
      backgroundColor: data.map((_, index) => COLORS[index % COLORS.length]),
      borderColor: "#ffffff",
      borderWidth: 2,
      hoverOffset: 7,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#11224e", boxWidth: 12, boxHeight: 12, padding: 14, font: { family: "Inter, sans-serif", size: 11, weight: "600" } },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const row = data[context.dataIndex];
            return ` ${row.completed ?? row.value ?? 0} participants · ${row.value ?? 0}% mix`;
          },
        },
      },
    },
  };

  return <div className="participation-chart" aria-label="Participation breakdown"><Pie data={chartData} options={options} /></div>;
}
