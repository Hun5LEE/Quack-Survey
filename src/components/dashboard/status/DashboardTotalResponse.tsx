"use client";
import { Chart as ChartJS, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { ChartData } from "chart.js";

import React from "react";

ChartJS.register(ArcElement);

const options2 = {
  maintainAspectRatio: false,
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
};

interface IDashboardTotalResponseProps {
  doughnutData: ChartData<"doughnut">;
  aggregation: {
    target: number;
    accumulated: number;
    remained: number;
  };
}

const DashboardTotalResponse = ({
  doughnutData,
  aggregation,
}: IDashboardTotalResponseProps) => {
  return (
    <div>
      <div className="m-n-sm flex items-center justify-between">
        <div className="h-[120px] w-[120px]">
          <Doughnut data={doughnutData} options={options2}></Doughnut>
        </div>
        <ul className="h-auto w-[157px]">
          <li>
            <div className="inline-block w-[92px] text-n-sm">목표응답수</div>
            <div className="inline-block w-[48px] text-right text-n-sm">
              {aggregation.target}
            </div>
            <div className="inline-block w-[15px] text-n-xs">명</div>
          </li>
          <li>
            <div className="inline-block w-[92px] text-n-sm">누적응답수</div>
            <div className="inline-block w-[48px] text-right text-n-sm">
              {aggregation.accumulated}
            </div>
            <div className="inline-block w-[15px] text-n-xs">명</div>
          </li>
          <li>
            <div className="inline-block w-[92px] text-n-sm">잔여응답수</div>
            <div className="inline-block w-[48px] text-right text-n-sm">
              {aggregation.remained}
            </div>
            <div className="inline-block w-[15px] text-n-xs">명</div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardTotalResponse;
