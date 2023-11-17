"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React from "react";
import type { ChartData } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
);

const options = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  elements: {
    line: {
      tension: 0.3,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 8,
        font: {
          size: 10,
        },
      },
    },
    y: {
      border: {
        display: false,
      },
      grid: {
        display: true,
      },
      ticks: {
        font: {
          size: 10,
        },
      },
    },
  },
};

interface IDashboardCurrentResponseProps {
  lineData: ChartData<"line">;
}

const DashboardCurrentResponse = ({
  lineData,
}: IDashboardCurrentResponseProps) => {
  return (
    <div className="h-[246px] w-full">
      <Line options={options} data={lineData} />
    </div>
  );
};

export default DashboardCurrentResponse;
