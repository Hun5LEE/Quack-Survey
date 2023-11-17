"use client";

import { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import LogicHeader from "@/components/logic/LogicHeader";
import NextPreviousButton from "@/components/NextPreviousButton";
import LogicProcess from "@/components/logic/LogicProcess";

const SettingLogicType: NextPage = (): JSX.Element => {
  const { templateId, formId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [logicType, setLogicType] = useState("");

  const form = JSON.parse(searchParams.get("form") as string);
  const index = searchParams.get("index");

  const logicTypeList = ["moving", "filter"];

  const handleLogicToggle = (type: string) => {
    if (type === "moving") {
      setLogicType("moving");
    } else {
      setLogicType("filter");
    }
  };

  useEffect(() => {
    if (!searchParams.get("form") || !index) {
      return router.replace(`/logic/${templateId}`);
    }

    if (!(form._id === formId && form.templateId === templateId)) {
      alert("유효하지 않은 주소입니다.");
      router.replace("/home");
    }
  }, []);

  return (
    <div className="min-w-[360px]">
      <LogicHeader title={form?.title} />
      <LogicProcess
        modeName={"type"}
        createDescription={"적용할 로직 타입을 선택하세요"}
      />
      <div className="m-n-lg flex justify-center gap-n-md">
        {logicTypeList.map((type: string) => {
          return (
            <button
              key={type}
              className={`flex h-[145px] w-[145px] cursor-pointer items-center justify-center border border-n-gray ${
                logicType === type
                  ? "bg-n-light-gray text-n-gray"
                  : "bg-white text-black"
              } `}
              onClick={() => handleLogicToggle(type)}
            >
              <div className="flex flex-col items-center justify-center">
                <Image
                  src={`/images/${type}_${logicType === type ? "g" : "b"}.svg`}
                  priority
                  width={45}
                  height={45}
                  alt=""
                />
                {type === "moving" ? "이동로직" : "필터로직"}
              </div>
            </button>
          );
        })}
      </div>
      {logicType !== "" ? (
        <Link
          href={{
            pathname: "select",
            query: { type: logicType, form: searchParams.get("form"), index },
          }}
        >
          <NextPreviousButton modeName={"single"} buttonText={["다음"]} />
        </Link>
      ) : null}
    </div>
  );
};

export default SettingLogicType;
