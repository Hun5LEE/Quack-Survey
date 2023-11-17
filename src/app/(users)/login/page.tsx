"use client";
import React from "react";
import {
  Button,
  LoginForm,
  UserDataInput,
  ErrorMessage,
  LinkInfo,
  FindPassword,
} from "@/components/users";
import {
  checkEmptyObject,
  handleLogin,
  validateEmail,
  validatePassword,
} from "@/utils/users";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import useModal from "@/hooks/useModal";

const Login = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors, isValid },
  } = useForm();
  const router: AppRouterInstance = useRouter();
  const { ModalContainer, openModal, closeModal } = useModal();

  return (
    <LoginForm>
      <>
        <form
          onSubmit={handleSubmit((data) => handleLogin(data, router, setError))}
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
          <LinkInfo
            linkDescription="회원가입"
            infoDescription="아직 아이디가 없다면? "
            url="/signup"
          />
          <div className="mt-5 flex justify-end">
            <p
              className="cursor-pointer text-sm text-n-dark-gray hover:text-n-light-black"
              onClick={() => openModal()}
            >
              비밀번호를 까먹었어요
            </p>
          </div>
          <Button
            disabled={!isValid || isSubmitting || !checkEmptyObject(errors)}
          >
            로그인
          </Button>
        </form>
        <ModalContainer title={"비밀번호 찾기"}>
          <FindPassword closeModal={closeModal} />
        </ModalContainer>
      </>
    </LoginForm>
  );
};

export default Login;
