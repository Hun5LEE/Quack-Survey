import React, { useState, useEffect } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetFocus,
  useFieldArray,
} from "react-hook-form";
import { IFormValues } from "./FormWrapper";
import Image from "next/image";
import ToolbarTypeCase from "../../ToolbarTypingCase";
import FormContentSelect from "./FormContentSelect";

interface IFormContentSelectWrapperProps {
  select: string[];
  editMode: boolean;
  isLogicAndTemplateOption: boolean;
  register: UseFormRegister<IFormValues>;
  setFocus: UseFormSetFocus<IFormValues>;
  getValues: UseFormGetValues<IFormValues>;
  setToastText: React.Dispatch<React.SetStateAction<string>>;
  control: Control<IFormValues | any>;
}

const FormContentSelectWrapper = ({
  editMode,
  register,
  isLogicAndTemplateOption,
  setToastText,
  setFocus,
  getValues,
  control,
}: IFormContentSelectWrapperProps): JSX.Element => {
  const [focusNumber, setFocusNumber] = useState(0);

  const { fields, append, remove } = useFieldArray({
    name: "select",
    control: control,
  });

  const handleCreateInputForm = () => {
    if (isLogicAndTemplateOption) {
      return setToastText("로직 및 옵션을 먼저 삭제해주세요.");
    }
    append("");
  };

  const handleDuplicate = () => {
    if (isLogicAndTemplateOption) {
      return setToastText("로직 및 옵션을 먼저 삭제해주세요.");
    }
    const previousSelect = getValues().select;
    const duplicateLastInput = previousSelect[previousSelect.length - 1];
    append(duplicateLastInput);
  };

  const handleFocusUp = () => {
    setFocus(`select.${focusNumber - 1}`, { shouldSelect: true });
  };

  const handleFocusDown = () => {
    setFocus(`select.${focusNumber + 1}`, { shouldSelect: true });
  };

  useEffect(() => {
    if (fields.length === 0) {
      append("");
    }
  }, []);

  return (
    <>
      <div className="w-full space-y-n-sm pb-n-md ">
        {fields?.map((field, i) => (
          <FormContentSelect
            key={field.id}
            remove={remove}
            isLogicAndTemplateOption={isLogicAndTemplateOption}
            setToastText={setToastText}
            setFocusNumber={setFocusNumber}
            fieldsLength={fields.length}
            editMode={editMode}
            register={register}
            index={i}
          />
        ))}
        {editMode ? (
          <button
            type="button"
            className="h-n-xlg flex w-[85%] cursor-pointer items-center  justify-center rounded-n-sm bg-n-light-gray"
            onClick={handleCreateInputForm}
          >
            <Image
              src="/images/plus.svg"
              width={24}
              height={24}
              alt=""
              priority
            />
          </button>
        ) : null}
      </div>
      {editMode ? (
        <ToolbarTypeCase
          onFocusUp={handleFocusUp}
          onFocusDown={handleFocusDown}
          onDuplicate={handleDuplicate}
          onEnter={handleCreateInputForm}
          modeName="form"
        />
      ) : null}
    </>
  );
};

export default React.memo(FormContentSelectWrapper);
