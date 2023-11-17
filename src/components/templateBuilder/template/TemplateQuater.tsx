import { useState, useEffect } from "react";
import { Form, TemplateOption } from "@/types/mongooseType";
import {
  FieldError,
  FieldErrors,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import { IOptionForm } from "./TemplateWrapper";
import Image from "next/image";
import ToggleButton from "../../ToggleButton";

interface ITemplateQuaterProps {
  existingIndex: number;
  templateOption: TemplateOption;
  selectTypeForms: Form[];
  register: any;
  resetField: UseFormResetField<IOptionForm>;
  errors: FieldErrors<IOptionForm> | any;
  setValue: UseFormSetValue<IOptionForm>;
}

const TemplateQuater = ({
  existingIndex,
  templateOption,
  register,
  setValue,
  errors,
  resetField,
  selectTypeForms,
}: ITemplateQuaterProps): JSX.Element => {
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);

  const errorMessage = errors?.quater?.filter(
    (error: FieldError) => error !== undefined,
  );

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const numberSelectedValue = Number(e.target.value);
    setIndex(numberSelectedValue);
    setValue("formId", selectTypeForms[numberSelectedValue]._id);
    resetField("quater", { quater: [] } as Object);
  };

  const handleToggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => !prev);
    resetField("quater");
  };

  const validateNumbers = (value: string) => {
    const regex = /^[0-9]+$/;
    if (!regex.test(value)) {
      return "숫자를 입력해주세요.";
    }
  };

  useEffect(() => {
    if (selectTypeForms?.length === 0) return;

    if (templateOption?.quater) {
      setIndex(existingIndex);
      setToggle((prev) => !prev);
      register("formId", { value: templateOption?.formId });
    } else {
      register("formId", { value: selectTypeForms[index]._id });
    }
  }, []);

  return (
    <div>
      <div className="mb-n-lg flex justify-between">
        <span className="items-center text-n-lg">쿼터비율 설정</span>
        <ToggleButton toggle={toggle} handleToggleButton={handleToggleButton} />
      </div>
      <span
        className={`h-[12px] text-n-xs ${
          errors?.sum?.message ? "text-n-red" : "text-black"
        }`}
      >
        {errors?.sum?.message}
      </span>
      <div className="border-x border-t border-n-gray bg-n-light-gray ">
        <select
          className="w-full border-b border-n-gray bg-n-light-gray py-[5px] text-center focus:outline-none"
          {...register("title")}
          onChange={handleChangeSelect}
          defaultValue={existingIndex}
        >
          {selectTypeForms?.map((form: any, i: number) => {
            return (
              <option key={form._id} value={i}>
                {form.title}
              </option>
            );
          })}
        </select>
        {selectTypeForms[index]?.select.map((text: string, i: number) => {
          return (
            <div className="flex border-b border-n-gray" key={i}>
              <label
                className="w-[90%] border-r border-n-gray py-[5px] pl-n-sm"
                htmlFor={`select ${i}`}
              >
                {text}
              </label>
              {!toggle ? (
                <div className="flex w-[10%] items-center justify-center bg-white">
                  <Image
                    src="/images/create_b.svg"
                    width={24}
                    height={16}
                    alt=""
                    priority
                  />
                </div>
              ) : (
                <input
                  className="w-[10%] text-center outline-none"
                  {...register(`quater[${i}]`, {
                    validate: (value: string) =>
                      toggle ? validateNumbers(value) : undefined,
                  })}
                  defaultValue={
                    toggle && templateOption?.quater
                      ? templateOption?.quater[i]
                      : ""
                  }
                  maxLength={2}
                  id={`select ${i}`}
                />
              )}
            </div>
          );
        })}
      </div>
      <span
        className={`h-[12px] text-n-xs ${
          errorMessage ? "text-n-red" : "text-black"
        }`}
      >
        {errorMessage ? errorMessage[0]?.message : ""}
      </span>
    </div>
  );
};

export default TemplateQuater;
