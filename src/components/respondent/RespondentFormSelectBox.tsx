import { Form, Logic } from "@/types/mongooseType";
import { useEffect } from "react";

interface IRespondentFormSelectBoxProps {
  form: Form;
  forms: Form[];
  text: string;
  logic?: Logic;
  index: number;
  formIndex: number;
  isChecked: boolean[];
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean[]>>;
  register: any;
  control: any;
}

const RespondentFormSelectBox = ({
  form,
  forms,
  text,
  logic,
  index,
  formIndex,
  isChecked,
  setIsChecked,
  setIsDisabled,
  register,
  control,
}: IRespondentFormSelectBoxProps): JSX.Element => {
  const { _id: id, plural, select, required } = form;
  // console.log(isChecked);

  const handleIsSingleChecked = (i: number) => {
    if (logic) {
      const includeLogic = logic.selector.includes(select[i]);
      const existingIndex = forms.findIndex(
        (item) => item._id === logic.appliedFormId,
      );
      if (includeLogic) {
        setIsDisabled((prev) => {
          const copyIsDisabled = [...prev];
          if (logic.type === "filter") {
            copyIsDisabled.splice(existingIndex, 1, !prev[existingIndex]);
            return copyIsDisabled;
          } else {
            const newCopyIsDisabled = prev.map((item: boolean, i: number) => {
              return formIndex < i && i < existingIndex ? true : false;
            });
            return newCopyIsDisabled;
          }
        });
      }
    }

    setIsChecked((prev) => {
      const copyIsChecked = [...prev].map(() => {
        return false;
      });
      copyIsChecked.splice(i, 1, !prev[i]);
      return copyIsChecked;
    });
  };
  // console.log(isChecked);

  const handleIsPluralChecked = (i: number) => {
    const checkedLength = isChecked.filter((item: boolean) => item === true);
    if (isChecked[i]) {
      setIsChecked((prev) => {
        const copyIsChecked = [...prev];
        copyIsChecked.splice(i, 1, !isChecked[i]);
        return copyIsChecked;
      });
      return;
    }
    if (checkedLength.length >= 3) return;
    setIsChecked((prev) => {
      const copyIsChecked = [...prev];
      copyIsChecked.splice(i, 1, !isChecked[i]);
      return copyIsChecked;
    });
  };

  return (
    <div className="ml-8 mr-2">
      <div
        className={`h-n-xlg flex w-[85%] items-center  rounded-n-sm  ${
          isChecked[index] ? "bg-n-light-blue text-white" : "bg-n-light-gray"
        }`}
      >
        <div className="flex w-full">
          <label
            htmlFor={`${id}_select_${index}`}
            className="mx-n-sm w-full shrink-0 cursor-pointer bg-inherit py-[5px] text-n-sm outline-none"
          >
            {text}
          </label>
          <input
            className="cursor-pointer"
            id={`${id}_select_${index}`}
            type="checkbox"
            checked={isChecked[index]} // 이부분 콘솔오류
            value={text}
            onClick={() => {
              if (!plural) {
                handleIsSingleChecked(index);
              } else {
                handleIsPluralChecked(index);
              }
            }}
            {...register(`form${formIndex + 1}[${index}]`)}
          />
        </div>
      </div>
    </div>
  );
};

export default RespondentFormSelectBox;
