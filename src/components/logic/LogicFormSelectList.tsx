import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFetch, putFetch } from "@/utils/fetch/core";
import { Form, Logic } from "@/types/mongooseType";
import { useGetForms } from "@/hooks/queries/useGetForms";
import Image from "next/image";

interface ISelector {
  selector: string[];
}

interface ILogicFormSelectListProps {
  type: string;
  order: number;
  select: string;
  selector: string[];
  form: Form;
  logic: Logic;
  templateId: string | string[];
}

const LogicFormSelectList = ({
  order,
  type,
  select,
  selector,
  form,
  logic,
  templateId,
}: ILogicFormSelectListProps): JSX.Element => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const existingIndex = selector?.findIndex((item: string) => item === select);
  const isLogic = existingIndex === -1 ? false : true;

  const { data: appliedForm, isLoading } = useGetForms(
    `/form?formId=${logic?.appliedFormId}`,
    logic?.appliedFormId,
  );

  const { mutate: updateMutate } = useMutation(
    (selectorData: ISelector) =>
      putFetch(`/logic?logicId=${logic._id}`, JSON.stringify(selectorData)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([form._id, "logics"]);
        queryClient.invalidateQueries([templateId, "logics"]);
      },
    },
  );

  const { mutate: deleteMutate } = useMutation(
    (logicId: string) => deleteFetch(`/logic?logicId=${logicId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([templateId, "logics"]);
        router.push(`/logic/${templateId}?formId=${form._id}`);
      },
    },
  );

  const handleCreateLogic = () => {
    if (!isOpen) return;
    const copySelector = [...selector, select];
    updateMutate({ selector: copySelector });
  };

  const handleDeleteLogic = () => {
    if (!isOpen) return;
    const existingSelectorIndex = selector.findIndex((item) => item === select);
    const copySelector = [...selector];
    copySelector.splice(existingSelectorIndex, 1);
    const filterSelector = selector.filter((item) => item !== select);

    if (copySelector.length === 0) {
      deleteMutate(logic._id);
    } else {
      updateMutate({ selector: filterSelector });
    }
  };

  const handleVisibleCreate = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div
      className="relative z-10 flex h-[63px] w-full cursor-pointer overflow-hidden bg-n-white"
      onClick={handleVisibleCreate}
    >
      <div className="h-full w-[53px] text-center text-n-xl font-bold leading-[63px]">
        {order + 1}
      </div>
      <div className="flex w-full flex-col ">
        <p className="mt-[8px] h-[20px] w-auto text-n-xs leading-[26px]">
          {select}
        </p>
        <div className="flex h-[37px] items-center gap-n-md">
          <div className="flex gap-n-xs text-n-md text-n-green">
            {type === "moving" ? (
              <Image
                src={`/images/${isLogic ? "moving_green" : "dash_black"}.svg`}
                alt=""
                height={20}
                width={20}
              />
            ) : (
              <Image
                src={`/images/${isLogic ? "filter_green" : "dash_black"}.svg`}
                alt=""
                height={20}
                width={20}
              />
            )}
            {!isLoading ? (
              <span>{isLogic ? `: ${appliedForm[0]?.title}` : null}</span>
            ) : null}
          </div>
        </div>
      </div>
      {isLogic ? (
        <div
          className={`flex h-full w-[100px] items-center justify-center  bg-n-red  text-white transition-all duration-300 ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-[100px] opacity-0"
          }`}
          onClick={handleDeleteLogic}
        >
          <span>삭제</span>
        </div>
      ) : (
        <div
          className={`flex h-full w-[100px] items-center justify-center bg-n-green  text-white transition-all duration-300 ${
            isOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-[100px] opacity-0"
          }`}
          onClick={handleCreateLogic}
        >
          <span>로직추가</span>
        </div>
      )}
    </div>
  );
};

export default LogicFormSelectList;
