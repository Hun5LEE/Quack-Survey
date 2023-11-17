"use client";
import DashboardTable from "@/components/dashboard/status/DashboardTable";
import DashboardCurrentResponse from "@/components/dashboard/status/DashboardCurrentResponse";
import DashboardTotalResponse from "@/components/dashboard/status/DashboardTotalResponse";
import { getFetch } from "@/utils/fetch/core";
import { useEffect, useState } from "react";

/* 테스트 데이터 : 추후 삭제 필요 */
const lineData = {
  labels: [
    "7.23",
    "7.24",
    "7.25",
    "7.26",
    "7.27",
    "7.28",
    "7.29",
    "7.24",
    "7.25",
    "7.26",
    "7.27",
    "7.28",
    "7.29",
  ],
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 36, 12, 22, 12, 12, 12],
      borderColor: "rgb(120, 142, 245)",
      backgroundColor: "white",
      borderWidth: 3,
    },
  ],
};
const doughnutData = {
  labels: ["7.23", "7.24", "7.25", "7.26", "7.27", "7.28", "7.29"],
  datasets: [
    {
      label: "Dataset 1",
      data: [12, 36],
      backgroundColor: ["rgb(120, 142, 245,0)", "rgb(120, 142, 245)"],
      borderColor: ["rgba(255, 99, 132, 0)", "rgb(120, 142, 245)"],
      borderWidth: 1,
      borderRadius: 100,
      cutout: "85%",
    },
  ],
};
const tableData = [
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
  { quater: "신유정", targetRatio: "68%", calculatedRatio: "50%" },
];
const aggregation = {
  target: 14,
  accumulated: 14,
  remained: 15,
};

const DashboardStatus = (): JSX.Element => {
  (async () => {
    const templatesRes = await getFetch("/template");
    console.log("fin", templatesRes);
  })();
  return (
    <div>
      <div className="h-[93px] w-full"></div>
      <div className="p-n-md">
        <div className="flex w-full items-center justify-between">
          <div className=" text-n-md font-bold">실시간 응답 현황</div>
          <div className="leading-n-xs mt-n-md h-n-lg text-right text-n-xs text-n-gray">
            2023.09.22 19:30
          </div>
        </div>
        <DashboardCurrentResponse lineData={lineData} />
      </div>
      <div className="w-full border-t-[1px] border-n-light-gray bg-n-white p-n-md">
        <div className="text-n-md font-bold">전체 응답 현황</div>
        <DashboardTotalResponse
          doughnutData={doughnutData}
          aggregation={aggregation}
        />
      </div>
      <div className="h-[350px] w-full border-t-[1px] border-n-light-gray bg-n-white p-n-md">
        <div className="text-n-md font-bold">쿼터 응답 현황</div>
        <DashboardTable tableData={tableData}></DashboardTable>
        <div className="h-[49px] w-full"></div>
      </div>
    </div>
  );
};

export default DashboardStatus;
