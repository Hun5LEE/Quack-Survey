"use client";

import { NextPage } from "next";
import { useParams } from "next/navigation";
import { useState } from "react";
import { read } from "@/constants/mode";
import TemplateWrapper from "@/components/templateBuilder/TemplateWrapper";
import SavePreserveBar from "@/components/SavePreserveBar";
import ToolbarInitialClickedCase from "@/components/ToolbarInitialClickedCase";

const TemplateBuilder: NextPage = (): JSX.Element => {
  const { templateBuilderId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [isFold, setIsFold] = useState(false);
  const [modeName, setModeName] = useState(read);

  const onOption = () => {
    setIsOpen((prev) => !prev);
  };

  const onFoldingAll = () => {
    setIsFold((prev) => !prev);
  };

  return (
    <>
      <SavePreserveBar onOption={onOption} modeName={modeName} />
      <TemplateWrapper
        templateBuilderId={templateBuilderId}
        isOpen={isOpen}
        onOption={onOption}
        modeName={modeName}
        setModeName={setModeName}
        isFold={isFold}
      />
      {modeName === read ? (
        <ToolbarInitialClickedCase
          isOpen={isOpen}
          modeName={modeName}
          isFold={isFold}
          onFoldingAll={onFoldingAll}
        />
      ) : null}
    </>
  );
};

export default TemplateBuilder;
