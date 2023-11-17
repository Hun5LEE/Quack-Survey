import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./FormWrapper";
import Image from "next/image";

interface IFormContentSelectProps {
  editMode: boolean;
  isLogicAndTemplateOption: boolean;
  index: number;
  fieldsLength: number;
  register: UseFormRegister<IFormValues>;
  setToastText: React.Dispatch<React.SetStateAction<string>>;
  setFocusNumber: React.Dispatch<React.SetStateAction<number>>;
  remove: (index?: number | number[]) => void;
}

const FormContentSelect = ({
  editMode,
  isLogicAndTemplateOption,
  index,
  fieldsLength,
  register,
  setToastText,
  setFocusNumber,
  remove,
}: IFormContentSelectProps): JSX.Element => {
  const handleDeleteInputForm = () => {
    if (isLogicAndTemplateOption) {
      return setToastText("로직 및 옵션을 먼저 삭제해주세요.");
    }
    remove(index);
  };

  const handleFocusNumber = () => {
    setFocusNumber(index);
  };

  return (
    <div className="h-n-xlg flex w-[85%] items-center  rounded-n-sm bg-n-light-gray ">
      <div className="w-[20px]">
        <Image
          className="cursor-pointer"
          src="/images/dragging.svg"
          width={24}
          height={24}
          alt=""
          priority
        />
      </div>
      <div className="w-[90%]">
        <input
          className="mx-n-sm w-full shrink-0 bg-inherit text-n-sm outline-none"
          type="text"
          placeholder="보기를 작성해주세요"
          {...register(`select.${index}`, {
            required: "보기를 작성해주세요.",
          })}
          onFocus={handleFocusNumber}
          disabled={!editMode || isLogicAndTemplateOption}
          maxLength={18}
        />
      </div>
      {editMode && fieldsLength > 1 ? (
        <button type="button" onClick={handleDeleteInputForm}>
          <div className="w-[20px]">
            <Image
              className="mx-n-sm cursor-pointer"
              src="/images/delete.svg"
              width={24}
              height={24}
              alt=""
              priority
            />
          </div>
        </button>
      ) : null}
    </div>
  );
};

export default FormContentSelect;
