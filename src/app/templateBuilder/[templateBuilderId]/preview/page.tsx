"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import { NextPage } from "next";
import { Form } from "@/types/mongooseType";
import { useState, useEffect } from "react";
import LogoBar from "@/components/LogoBar";
import ResponseTitle from "@/components/respondent/ResponseTitle";
import NextPreviousButton from "@/components/NextPreviousButton";
import PreviewFormWrapper from "@/components/templateBuilder/preview/PreviewFormWrapper";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import Toast from "@/components/Toast";

const Preview: NextPage = (): JSX.Element => {
  const { templateBuilderId } = useParams();
  const router = useRouter();

  const [toastText, setToastText] = useState("");

  const { data, isLoading } = useQuery(["preview", templateBuilderId], () =>
    getFetch(`/template/respondent?templateId=${templateBuilderId}`),
  );

  const handleLeftClick = () => {
    router.push(`/templateBuilder/${templateBuilderId}`);
  };

  const handleRightClick = async () => {
    try {
      await navigator.clipboard.writeText(
        `http://localhost:3000/respondent/${templateBuilderId}`,
      );
      setToastText("링크가 복사되었습니다.");
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setToastText("");
  };

  useEffect(() => {
    if (!isLoading) {
      if (data.error === "Failed to get template") {
        alert("잘못된 주소입니다.");
        return router.replace("/home");
      }
    }
  }, [isLoading]);

  return (
    <>
      <Link href={"/home"}>
        <LogoBar modeName="dark" />
      </Link>
      <div className="m-auto mb-[70px]  mt-[60px] w-[360px]">
        {!isLoading ? (
          <>
            <ResponseTitle
              title={data?.template?.title}
              description={data?.template?.description}
            />
            {data?.form?.map((formData: Form, i: number) => (
              <PreviewFormWrapper
                key={formData?._id}
                form={formData}
                index={i}
              />
            ))}
          </>
        ) : (
          <LoadingSpinner />
        )}
        <div className="fixed left-0 top-0 -z-50 h-screen w-full bg-n-light-gray "></div>
      </div>
      <NextPreviousButton
        modeName={"double"}
        buttonText={["수정모드", "링크복사"]}
        onLeftClick={handleLeftClick}
        onRightClick={handleRightClick}
      />
      {toastText !== "" ? (
        <Toast editMode={true} toastText={toastText} onClose={handleClose} />
      ) : null}
    </>
  );
};
export default Preview;
