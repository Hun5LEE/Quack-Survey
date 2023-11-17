import { useState, useEffect } from "react";
import { Form, Logic } from "@/types/mongooseType";
import Image from "next/image";
import Link from "next/link";

interface ILogicListProps {
  form: Form;
  logics: Logic[];
  templateId: string | string[];
  index: number;
  isLoadingLogics: boolean;
}

const LogicList = ({
  form,
  logics,
  index,
  templateId,
  isLoadingLogics,
}: ILogicListProps): JSX.Element => {
  const [isLogic, setIsLogic] = useState(false);

  useEffect(() => {
    if (!isLoadingLogics) {
      const existingIndex = logics?.findIndex(
        (logic: Logic) => logic.formId === form._id,
      );
      if (existingIndex !== -1) {
        setIsLogic(true);
      }
    }
  }, [isLoadingLogics]);

  return (
    <Link
      href={{
        pathname: isLogic
          ? `${templateId}/${form._id}`
          : `${templateId}/${form._id}/type`,
        query: { form: JSON.stringify(form), index },
      }}
      className="flex cursor-pointer justify-between  border bg-white hover:bg-n-light-gray"
    >
      <div className="flex items-center">
        <span className="h-full w-[53px] text-center text-n-xl font-bold leading-[63px]">
          {index + 1}
        </span>
        <p>{form.title}</p>
      </div>
      <div className="mr-n-md self-center">
        <Image
          src={`/images/${isLogic ? "logic_green" : "dash_black"}.svg`}
          alt=""
          height={24}
          width={24}
          priority
        />
      </div>
    </Link>
  );
};

export default LogicList;
