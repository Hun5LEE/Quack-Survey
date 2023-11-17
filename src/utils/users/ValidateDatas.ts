import {
  FieldValues,
  UseFormClearErrors,
  UseFormSetError,
} from "react-hook-form";

interface IValidateData {
  (
    data: string,
    setError: UseFormSetError<FieldValues>,
    clearErrors: UseFormClearErrors<FieldValues>,
  ): void;
}

const validateEmail: IValidateData = (email, setError, clearErrors) => {
  const regex = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i;

  if (!email) setError("email", { message: "이메일은 필수 입력입니다." });
  else if (!regex.test(email))
    setError("email", { message: "이메일 형식을 확인해 주세요." });
  else clearErrors("email");
};

const validatePassword: IValidateData = (password, setError, clearErrors) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/i;

  if (!password)
    setError("password", { message: "비밀번호는 필수 입력입니다." });
  else if (!regex.test(password))
    setError("password", {
      message: "비밀번호는 8~16글자 사이의 문자, 숫자, 특수 문자 조합입니다.",
    });
  else clearErrors("password");
};

export { validateEmail, validatePassword };
