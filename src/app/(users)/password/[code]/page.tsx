"use client";

import React from "react";
import { Button, ErrorMessage, UserDataInput } from "@/components/users";
import {
  checkEmptyObject,
  checkPassword,
  handleChange,
  validatePassword,
} from "@/utils/users";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const Password = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm();
  const { code } = useParams();
  const router = useRouter();

  return (
    <div className="w-[360px]">
      <form
        onSubmit={handleSubmit((data) =>
          handleChange(data.rePassword, code, router),
        )}
      >
        <UserDataInput
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            onChange: (data) => {
              validatePassword(data.target.value, setError, clearErrors);
            },
          })}
          isError={!!errors.password}
          type="password"
          placeholder="비밀번호를 입력해 주세요."
        />
        <ErrorMessage>{errors.password?.message?.toString()}</ErrorMessage>
        <UserDataInput
          {...register("rePassword", {
            required: "비밀번호 확인은 필수입니다.",
            onChange: (data) => {
              checkPassword(
                watch("password"),
                data.target.value,
                setError,
                clearErrors,
              );
            },
          })}
          isError={!!errors.rePassword}
          type="password"
          placeholder="비밀번호를 다시 입력해 주세요."
        />
        <ErrorMessage>{errors.rePassword?.message?.toString()}</ErrorMessage>
        <Button
          disabled={!isValid || isSubmitting || !checkEmptyObject(errors)}
        >
          변경하기
        </Button>
      </form>
    </div>
  );
};

export default Password;
