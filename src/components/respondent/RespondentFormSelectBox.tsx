import { Form, Logic } from "@/types/mongooseType";
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface IRespondentFormSelectBoxProps {
  form: Form;
  forms: Form[];
  text: string;
  logic?: Logic;
  index: number;
  formIndex: number;
  isChecked: boolean[];
  isDisabled: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean[]>>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const RespondentFormSelectBox = ({
  form,
  forms,
  text,
  logic,
  index,
  formIndex,
  isChecked,
  isDisabled,
  setIsChecked,
  setIsDisabled,
  getValues,
  setValue,
  register,
}: IRespondentFormSelectBoxProps): JSX.Element => {
  const { _id: id, plural, select, required } = form;
  const inititalIsChecked = isChecked.map(() => false);

  const handleIsSingleChecked = (i: number) => {
    const mutationIsChecked = isChecked.map(
      (value: boolean, isCheckedIndex) => {
        return isCheckedIndex === i ? text : false;
      },
    );
    if (!isChecked[i]) {
      setValue(`form${formIndex + 1}`, mutationIsChecked);
    } else {
      setValue(`form${formIndex + 1}`, inititalIsChecked);
    }

    if (logic) {
      const includeLogic = logic.selector.includes(select[i]);
      const existingIndex = forms.findIndex(
        (item) => item._id === logic.appliedFormId,
      );
      if (includeLogic) {
        setIsDisabled((prev) => {
          const copyIsDisabled = [...prev];
          if (logic.type === "filter") {
            copyIsDisabled.splice(existingIndex, 1, true);
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

  const handleIsPluralChecked = (i: number) => {
    const checkedLength = isChecked.filter((item: boolean) => item === true);

    if (logic) {
      const includeLogic = logic.selector.includes(select[i]);
      const existingIndex = forms.findIndex(
        (item) => item._id === logic.appliedFormId,
      );
      if (includeLogic) {
        setIsDisabled((prev) => {
          const copyIsDisabled = [...prev];
          if (logic.type === "filter") {
            copyIsDisabled.splice(existingIndex, 1, true);
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

  const handleValidate = () => {
    if (isDisabled) return;
    if (!required) return;
    const respondentForms: any[] = Object.values(getValues());
    const checkRespondentForms = respondentForms[formIndex];
    const someCheckRespondentForms = checkRespondentForms.some(
      (item: boolean | string) => typeof item === "string",
    );
    if (!someCheckRespondentForms) {
      return "본 문항에 응답해주세요!";
    }
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
            value={text}
            onClick={() => {
              if (!plural) {
                handleIsSingleChecked(index);
              } else {
                handleIsPluralChecked(index);
              }
            }}
            {...register(`form${formIndex + 1}[${index}]`, {
              validate: handleValidate,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default RespondentFormSelectBox;
