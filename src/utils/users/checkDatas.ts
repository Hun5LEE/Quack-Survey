import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";

interface ICheckPassword {
  (
    password: string,
    rePassword: string,
    setError: UseFormSetError<FieldValues>,
    clearErrors: UseFormClearErrors<FieldValues>,
  ): void;
}

interface ICheckEmptyObject {
  (data: object): boolean;
}

const checkPassword: ICheckPassword = (
  password,
  rePassword,
  setError,
  clearErrors,
) => {
  if (!rePassword)
    setError("rePassword", { message: "비밀번호 확인은 필수입니다." });
  else if (password !== rePassword)
    setError("rePassword", {
      message: "비밀번호가 일치하지 않습니다.",
    });
  else clearErrors("rePassword");
};

const checkEmptyObject: ICheckEmptyObject = (data) => {
  return Object.keys(data).length === 0;
};

export { checkPassword, checkEmptyObject };
