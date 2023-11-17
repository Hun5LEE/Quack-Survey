"use client";

import { NextPage } from "next";
import { useMutation } from "@tanstack/react-query";
import { postFetch } from "@/utils/fetch/core";
import { ITemplateData } from "@/components/templateBuilder/template/TemplateDescriptionWrapper";
import { useRouter } from "next/navigation";
import SavePreserveBar from "@/components/SavePreserveBar";
import ToolbarInitialClickedCase from "@/components/ToolbarInitialClickedCase";
import InitialModeScreen from "@/components/InitialModeScreen";

const Template: NextPage = (): JSX.Element => {
  const router = useRouter();

  const { mutate } = useMutation((body: ITemplateData) =>
    postFetch("/template", JSON.stringify(body)),
  );

  const handleCreateTemplate = () => {
    mutate(
      { title: "", description: "" },
      {
        onSuccess: (data) => router.push(`/templateBuilder/${data._id}`),
      },
    );
  };

  return (
    <>
      <SavePreserveBar />
      <InitialModeScreen
        onCreateTemplate={handleCreateTemplate}
        innerText="폼을 생성해주세요."
      />
      <ToolbarInitialClickedCase />
    </>
  );
};

export default Template;
