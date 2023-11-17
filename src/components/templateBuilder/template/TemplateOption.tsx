import { Form, Template, TemplateOption } from "@/types/mongooseType";
import {
  FieldErrors,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import { IOptionForm } from "./TemplateWrapper";
import TemplateDeadLine from "./TemplateDeadLine";
import TemplateQuater from "./TemplateQuater";
import TemplateTargetNumber from "./TemplateTargetNumber";

interface ITemplateOptionProps {
  template: Template;
  templateOption: TemplateOption;
  forms: Form[];
  errors: FieldErrors<IOptionForm>;
  register: UseFormRegister<IOptionForm>;
  setValue: UseFormSetValue<IOptionForm>;
  resetField: UseFormResetField<IOptionForm>;
}

const TemplateOption = ({
  template,
  templateOption,
  forms,
  register,
  setValue,
  errors,
  resetField,
}: ITemplateOptionProps): JSX.Element => {
  const selectTypeForms = forms?.filter(
    (form: Form) => form?.type === "select",
  );

  const existingIndex = selectTypeForms?.findIndex(
    (form: Form) => form?._id === templateOption?.formId,
  );

  return (
    <div className="flex flex-col space-y-n-lg">
      <TemplateDeadLine deadline={template.deadline} register={register} />
      <TemplateTargetNumber
        targetNumber={template.targetNumber}
        register={register}
        errors={errors}
        resetField={resetField}
      />
      <TemplateQuater
        existingIndex={existingIndex}
        templateOption={templateOption}
        register={register}
        setValue={setValue}
        resetField={resetField}
        errors={errors}
        selectTypeForms={selectTypeForms}
      />
    </div>
  );
};

export default TemplateOption;
