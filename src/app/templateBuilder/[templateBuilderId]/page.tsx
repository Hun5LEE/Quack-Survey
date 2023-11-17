"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { read } from "@/constants/mode";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getFetch } from "@/utils/fetch/core";
import Toast from "@/components/Toast";
import TemplateWrapper from "@/components/templateBuilder/template/TemplateWrapper";
import SavePreserveBar from "@/components/SavePreserveBar";
import ToolbarInitialClickedCase from "@/components/ToolbarInitialClickedCase";

const TemplateBuilder: NextPage = (): JSX.Element => {
  const router = useRouter();
  const { templateBuilderId } = useParams();
  const [toastText, setToastText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFold, setIsFold] = useState(false);
  const [modeName, setModeName] = useState(read);

  const { data: complete, isLoading: isLoadingComplete } = useQuery(
    ["respondent", templateBuilderId],
    () => getFetch(`/complete?templateId=${templateBuilderId}`),
  );

  const handleNavigateHome = () => {
    router.push("/home");
  };

  const handleOption = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFoldAll = () => {
    setIsFold((prev) => !prev);
  };

  const handleSave = () => {
    setToastText("템플릿 저장이 완료되었습니다.");
  };

  const handlePreview = () => {
    router.push(`/templateBuilder/${templateBuilderId}/preview`);
  };

  const handleClose = () => {
    setToastText("");

    if (toastText === "옵션 저장이 완료되었습니다") {
      setIsOpen((prev) => !prev);
    } else {
      router.push(`/templateBuilder/${templateBuilderId}/preview`);
    }
  };

  useEffect(() => {
    if (isLoadingComplete) return;

    if (complete.length >= 1) {
      alert("설문이 시작 되었습니다.");
      return router.replace("/home");
    }
  }, [isLoadingComplete]);

  return (
    <>
      <SavePreserveBar
        modeName={modeName}
        onOption={handleOption}
        onSave={handleSave}
        onPreview={handlePreview}
        onNavigateHome={handleNavigateHome}
      />
      <TemplateWrapper
        templateBuilderId={templateBuilderId}
        isOpen={isOpen}
        isFold={isFold}
        modeName={modeName}
        onOption={handleOption}
        setModeName={setModeName}
        setToastText={setToastText}
      />
      {modeName === read ? (
        <ToolbarInitialClickedCase
          modeName={modeName}
          isFold={isFold}
          onFoldAll={handleFoldAll}
        />
      ) : null}
      {toastText !== "" ? (
        <Toast editMode={true} toastText={toastText} onClose={handleClose} />
      ) : null}
    </>
  );
};

export default TemplateBuilder;
