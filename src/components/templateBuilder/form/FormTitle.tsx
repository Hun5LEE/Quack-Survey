import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./FormWrapper";
import React from "react";

interface IFormTitleProps {
  title: string;
  index: number;
  editMode: boolean;
  register: UseFormRegister<IFormValues>;
}

const FormTitle = ({
  title,
  index,
  editMode,
  register,
}: IFormTitleProps): JSX.Element => {
  return (
    <div className="mb-n-md flex h-auto w-full">
      <span
        className={`tr text-n-xl ${
          editMode ? "text-n-light-blue" : "text-n-dark-gray"
        }`}
      >
        {index + 1}
      </span>
      <textarea
        className={`ml-n-md w-[300px] resize-none self-end  bg-white pt-[5px] text-n-md text-black outline-none ${
          title.length < 21
            ? "disabled:h-[36px] "
            : "  disabled:h-[40px] disabled:text-xs"
        }`}
        {...register("title", {
          required: "제목을 작성해주세요.",
        })}
        defaultValue={title}
        placeholder="제목을 작성해주세요."
        disabled={!editMode}
        maxLength={60}
      />
    </div>
  );
};

export default React.memo(FormTitle);
