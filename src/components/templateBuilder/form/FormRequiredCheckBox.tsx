import { UseFormRegister } from "react-hook-form";
import { IFormValues } from "./FormWrapper";

interface IFormRequiredCheckBoxProps {
  editMode: boolean;
  formId: string;
  register: UseFormRegister<IFormValues>;
}

const FormRequiredCheckBox = ({
  editMode,
  formId,
  register,
}: IFormRequiredCheckBoxProps): JSX.Element => {
  return (
    <div className="ml-n-sm flex items-center pt-[5px]">
      <input
        className="mr-[4px]"
        {...register("required")}
        type="checkbox"
        disabled={!editMode}
        id={formId}
      />
      <label className="text-n-sm " htmlFor={formId}>
        필수응답
      </label>
    </div>
  );
};

export default FormRequiredCheckBox;
