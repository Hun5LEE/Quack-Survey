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
import ChartDataLabels from "chartjs-plugin-datalabels";

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
  indexAxis: "y",
  labels: {
    display: false,
  },
  plugins: {
    datalabels: {
      formatter: function (value, context) {
        const maxLen = 6;
        if (context.chart.data.labels[value - 1].length > maxLen) {
          return context.chart.data.labels[value - 1].substring(0, 5) + "...";
        } else return context.chart.data.labels[value - 1];
      },
      display: true,
      color: "white",
      anchor: "end",
      align: "start",
    },
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
      display: true,
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
      display: false,
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

interface IDashboardVerticalGraphProps {
  graphLabels: string[];
  graphData: number[];
}

const DashboardVerticalGraph = ({
  graphLabels,
  graphData,
}: IDashboardVerticalGraphProps): JSX.Element => {
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
  return <Bar plugins={[ChartDataLabels]} options={options} data={data} />;
};

export default DashboardVerticalGraph;
