import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";

interface IRespondentFormTextBoxProps {
  formIndex: number;
  required: boolean;
  isDisabled: boolean;
  getValues: UseFormGetValues<FieldValues>;
  register: UseFormRegister<FieldValues>;
}

const RespondentFormTextBox = ({
  formIndex,
  required,
  isDisabled,
  getValues,
  register,
}: IRespondentFormTextBoxProps): JSX.Element => {
  const handleValidate = () => {
    if (isDisabled) return;
    if (!required) return;
    const respondentForms: ((string | boolean)[] | string)[] = Object.values(
      getValues(),
    );
    const checkRespondentForms = respondentForms[formIndex];

    if (checkRespondentForms === "") {
      return "본 문항에 응답해주세요!";
    }
  };

  return (
    <>
      <textarea
        className="ml-8 mr-2 h-[240px] w-[300px] resize-none rounded-md border border-n-blue p-2 text-n-sm"
        placeholder="답변을 입력해주세요."
        {...register(`form${formIndex + 1}`, {
          validate: handleValidate,
        })}
        maxLength={300}
      />
    </>
  );
};

export default RespondentFormTextBox;
