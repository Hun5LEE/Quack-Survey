"use client";
import React from "react";
import {
  Button,
  SignupForm,
  UserDataInput,
  ErrorMessage,
  LinkInfo,
} from "@/components/users";
import {
  checkEmptyObject,
  checkPassword,
  handleSignup,
  validateEmail,
  validatePassword,
} from "@/utils/users";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

const Signup = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { isSubmitting, errors, isValid },
  } = useForm();
  const router: AppRouterInstance = useRouter();

  return (
    <SignupForm>
      <form
        onSubmit={handleSubmit((data) => handleSignup(data, router, setError))}
      >
        <UserDataInput
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            onChange: (data) => {
              validateEmail(data.target.value, setError, clearErrors);
            },
          })}
          isError={!!errors.email}
          type="email"
          placeholder="이메일을 입력해 주세요."
        />
        <ErrorMessage>{errors.email?.message?.toString()}</ErrorMessage>
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
        <UserDataInput
          {...register("username", {
            required: false,
          })}
          isError={!!errors.username}
          type="text"
          placeholder="(선택사항) 닉네임을 입력해 주세요."
        />
        <LinkInfo
          linkDescription="로그인"
          infoDescription="이미 아이디가 있다면? "
          url="/login"
        />
        <Button
          disabled={!isValid || isSubmitting || !checkEmptyObject(errors)}
        >
          회원가입
        </Button>
      </form>
    </SignupForm>
  );
};

export default Signup;
