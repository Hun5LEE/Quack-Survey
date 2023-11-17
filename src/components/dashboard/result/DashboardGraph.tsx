import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import React from "react";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

const options = {
  maintainAspectRatio: true,
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
        callback: function (index: number): string {
          const maxLen = 6;
          const label = this.getLabelForValue(index);
          if (label.length > maxLen) {
            return label.substring(0, maxLen) + "...";
          } else return label;
        },
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

interface IDashboardGraphProps {
  graphLabels: string[];
  graphData: number[];
}

const DashboardGraph = ({
  graphLabels,
  graphData,
}: IDashboardGraphProps): JSX.Element => {
  const data = {
    labels: graphLabels,
    datasets: [
      {
        label: "Dataset 1",
        data: graphData,
        backgroundColor: "#788ef5",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default DashboardGraph;
