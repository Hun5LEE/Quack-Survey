"use client";

import DashboardGraph from "@/components/dashboard/result/DashboardGraph";
import DashboardDescription from "@/components/dashboard/result/DashboardDescription";
import DashboardResultWrapper from "@/components/dashboard/result/DashboardResultWrapper";
import DashboardToolbar from "@/components/dashboard/DashboardToolbar";
import { useState } from "react";

/* props 연결필요 */
const DashboardResult = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const graphLabels = [
    "예",
    "아니오",
    "잘 모르겠음",
    "가나다라마바사아aaaa",
    "가나다라마바사아bbbb",
    "가나다라마바사아cccc",
    "테스트 문자입니다. 테스트 문제입니다테스트 ",
  ];
  const graphData = [0.1, 0.2, 0.1, 0.1, 0.1, 0.1, 0.3];
  const descriptionData = [
    "테스트 문자입니다. 테스트 문제입니다테스트 ",
    "테스트 문자입니다. 테스트 문제입니다테스트 ",
    "테스트 문자입니다. 테스트 문제입니다테스트 ",
    "테스트 문자입니다. 테스트 문제입니다테스트 ",
  ];
  return (
    <div>
      <div className="h-[93px] w-full"></div>
      <div className="flex h-full min-h-[620px] w-full flex-col gap-n-md bg-n-light-gray">
        {/* 데이터 매핑 및 분기처리 필요 */}
        <DashboardResultWrapper title={"1번 문항입니다"} number={1}>
          <DashboardGraph
            graphData={graphData}
            graphLabels={graphLabels}
          ></DashboardGraph>
        </DashboardResultWrapper>
        <DashboardResultWrapper title={"2번 문항입니다"} number={2}>
          <DashboardDescription
            descriptionData={descriptionData}
          ></DashboardDescription>
        </DashboardResultWrapper>
      </div>
      <DashboardToolbar
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      ></DashboardToolbar>
    </div>
  );
};

export default DashboardResult;
