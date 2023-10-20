import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFetch, getFetch, putFetch } from "@/utils/fetch/core";
import Image from "next/image";

interface ISelector {
  selector: string[];
}

interface ILogicFormSelectListProps {
  type: string;
  order: number;
  select: string;
  selector: string[];
  form: any;
  logic: any;
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

  const { data: appliedForm, isLoading } = useQuery([logic.appliedFormId], () =>
    getFetch(`/form?formId=${logic.appliedFormId}`),
  );

  const { mutate } = useMutation((selectorData: ISelector) =>
    putFetch(`/logic?logicId=${logic._id}`, JSON.stringify(selectorData)),
  );

  const { mutate: deleteMutate } = useMutation(
    (logicId: string) => deleteFetch(`/logic?logicId=${logicId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([templateId]);
        queryClient.invalidateQueries([templateId, "logics"]);
      },
    },
  );

  const handleCreateLogic = () => {
    if (!isOpen) return;
    const copySelector = [...selector, select];
    mutate(
      { selector: copySelector },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([form._id]);
        },
      },
    );
  };

  const handleDeleteLogic = () => {
    if (!isOpen) return;
    const existingSelectorIndex = selector.findIndex((item) => item === select);
    const copySelector = [...selector];
    copySelector.splice(existingSelectorIndex, 1);

    const filterSelector = selector.filter((item) => item !== select);

    if (copySelector.length === 0) {
      deleteMutate(logic._id, {
        onSuccess: () => {
          router.push(`/logic/${templateId}?formId=${form._id}`);
        },
      });
    } else {
      mutate(
        { selector: filterSelector },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([form._id]);
          },
        },
      );
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
              <span>{isLogic ? `: ${appliedForm[0].title}` : null}</span>
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
