"use client";

import { NextPage } from "next";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form } from "@/types/mongooseType";
import { useGetLogics } from "@/hooks/queries/useGetLogics";
import { useGetForms } from "@/hooks/queries/useGetForms";
import LoadingSpinner from "@/components/LoadingSpinner";
import NextPreviousButton from "@/components/NextPreviousButton";
import LogicList from "@/components/logic/LogicList";

const LogicManagement: NextPage = (): JSX.Element => {
  const { templateId } = useParams();
  const router = useRouter();

  const { data: forms, isLoading: isLoadingForms } = useGetForms(
    `/form/all?templateId=${templateId}`,
    templateId,
    0,
  );

  const { data: logics, isLoading: isLoadingLogics } = useGetLogics(
    `/logic/all?templateId=${templateId}`,
    templateId,
    0,
  );

  const handleSingleClick = () => {
    router.push(`/templateBuilder/${templateId}`);
  };

  useEffect(() => {
    if (isLoadingForms) return;
    if (forms?.error) {
      alert("유효하지 않은 주소입니다.");
      router.replace("/home");
    }
  }, [isLoadingForms, forms]);

  return (
    <div className="min-w-[360px]">
      <div className="mb-[60px]flex fixed top-0 w-full min-w-[360px] flex-col items-center justify-center border-n-light-gray bg-n-black p-n-md text-n-white">
        <span className="text-n-lg">로직설정</span>
      </div>
      <div className="mt-[80px] space-y-n-md">
        {!isLoadingForms && Array.isArray(forms) ? (
          forms
            ?.filter((form) => form.type === "select")
            .map((form: Form, i: number) => (
              <LogicList
                key={`${form._id} i`}
                index={i}
                form={form}
                logics={logics}
                isLoadingLogics={isLoadingLogics}
                templateId={templateId}
              />
            ))
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <NextPreviousButton
        modeName={"single"}
        buttonText={["취소"]}
        onSingleClick={handleSingleClick}
      />
    </div>
  );
};

export default LogicManagement;
