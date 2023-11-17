"use client";

import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import NextPreviousButton from "@/components/NextPreviousButton";
import Toast from "@/components/Toast";
import LogicHeader from "@/components/logic/LogicHeader";
import LogicProcess from "@/components/logic/LogicProcess";

const SettingLogicSelect: NextPage = (): JSX.Element => {
  const { templateId, formId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isSelected, setIsSelected] = useState<boolean[]>([]);
  const [toastText, setToastText] = useState("");

  const form = JSON.parse(searchParams.get("form") as string);
  const index = searchParams.get("index");
  const type = searchParams.get("type");

  const handleIsSelected = (index: number) => {
    setIsSelected((prev) => {
      const copyIsSelected = [...prev];
      copyIsSelected.splice(index, 1, !isSelected[index]);
      return copyIsSelected;
    });
  };

  const handleLeftClick = () => {
    router.back();
  };

  const handleRightClick = () => {
    const existingIndex = isSelected.findIndex((item) => item === true);
    if (existingIndex !== -1) {
      const selector = isSelected
        .map((item, i) => (item ? form.select[i] : undefined))
        .filter((item) => item !== undefined);

      router.push(
        `/logic/${templateId}/${form._id}/form?selector=${JSON.stringify(
          selector,
        )}&form=${searchParams.get("form")}&type=${type}&index=${index}`,
      );
    } else {
      setToastText("보기를 선택해주세요.");
    }
  };

  const onClose = () => {
    setToastText("");
  };

  useEffect(() => {
    if (!type || !form || !index) {
      return router.replace(`/logic/${templateId}`);
    } else {
      setIsSelected((prev) => {
        const copyIsSelected = [...prev];
        const newIsSelected = Array(
          JSON.parse(searchParams.get("form") as string).select.length,
        ).fill(false);
        copyIsSelected.push(...newIsSelected);
        return copyIsSelected;
      });
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
        modeName="select"
        createDescription={"로직 적용할 항목을 선택하세요"}
      />
      <div className="m-n-lg flex flex-col gap-n-sm">
        {form?.select?.map((item: string, i: number) => {
          return (
            <div key={i}>
              {item === "" ? null : (
                <div
                  className={`h-[42px] w-full cursor-pointer rounded-n-md border border-n-gray p-n-sm ${
                    isSelected[i]
                      ? "bg-n-light-gray text-n-gray"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleIsSelected(i)}
                >
                  {item}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <NextPreviousButton
        modeName={"double"}
        buttonText={["이전", "다음"]}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
      {toastText !== "" ? (
        <Toast toastText={toastText} onClose={onClose} />
      ) : null}
    </div>
  );
};

export default SettingLogicSelect;
