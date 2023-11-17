import { setCookie } from "cookies-next";
import { patchFetch, postFetch } from "../fetch/core";
import { FieldValues, UseFormSetError } from "react-hook-form";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

interface ICehckErros {
  (message: string, setError: UseFormSetError<FieldValues>): void;
}

interface IHandleUserAction {
  (
    data: FieldValues,
    router: AppRouterInstance,
    setError: UseFormSetError<FieldValues>,
  ): Promise<any>;
}

interface IHandleChange {
  (
    newPassword: string,
    code: string | string[],
    router: AppRouterInstance,
  ): Promise<any>;
}

const checkErros: ICehckErros = (message, setError) => {
  switch (message) {
    case "Email does not match.":
      setError(
        "email",
        { message: "이메일을 확인해 주세요." },
        { shouldFocus: true },
      );
      break;
    case "Email already exists.":
      setError(
        "email",
        { message: "이미 가입된 아이디입니다." },
        { shouldFocus: true },
      );
      break;
    case "Password does not match.":
      setError(
        "password",
        { message: "비밀번호를 확인해 주세요." },
        { shouldFocus: true },
      );
      break;
  }
};

const handleSignup: IHandleUserAction = async (data, router, setError) => {
  const res = await postFetch("/users/signup", JSON.stringify(data));

  if (res.state) router.replace(`/verify?email=${data.email}`);
  else checkErros(res.message, setError);
};

const handleLogin: IHandleUserAction = async (data, router, setError) => {
  const res = await postFetch("/users/login", JSON.stringify(data));

  if (res.state) {
    setCookie("username", res.data.username);
    router.replace("/home");
  } else if (res.message === "Email not verified.") {
    router.replace(`/verify?email=${data.email}`);
  } else {
    checkErros(res.message, setError);
  }
};

const handleChange: IHandleChange = async (newPassword, code, router) => {
  try {
    const res = await patchFetch(
      "/users/find/password",
      JSON.stringify({ newPassword, code }),
    );

    if (res.state) {
      alert(
        "비밀번호 변경이 완료되었습니다. \n변경된 비밀번호로 로그인 해주세요.",
      );
    } else {
      alert("만료된 인증링크 입니다.");
    }

    return router.replace("/login");
  } catch (err) {
    return null;
  }
};

export { handleSignup, handleLogin, handleChange };
