import { postFetch } from "@/utils/fetch/core";
import { validateEmail } from "@/utils/users/ValidateDatas";
import { useForm } from "react-hook-form";
import { ErrorMessage } from ".";

interface IFindPasswordProps {
  closeModal: () => void;
}

const FindPassword = ({ closeModal }: IFindPasswordProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const res = await postFetch(
          "/users/find/password",
          JSON.stringify(data),
        );

        if (res.state) {
          alert(
            "입력하신 이메일로 비밀번호 변경 링크가 전송되었습니다. \n이메일 전송에는 최대 5분의 시간이 소요됩니다. \n해당 링크는 10분간 유효합니다.",
          );
          closeModal();
        } else {
          setError(
            "email",
            { message: "가입 정보가 없습니다." },
            { shouldFocus: true },
          );
        }
      })}
    >
      <p className="mb-3">이메일</p>
      <div className="flex">
        <input
          className={`h-[36px] w-full border-[1px] border-solid bg-n-light-gray px-3 ${
            !!errors.email ? "border-rose-400" : ""
          }`}
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            onChange: (data) => {
              validateEmail(data.target.value, setError, clearErrors);
            },
          })}
          type="email"
          placeholder="이메일을 입력해 주세요."
        />
        <button className="h-[36px] w-full basis-14 bg-n-blue text-n-lg text-white hover:border-[1px] hover:border-solid hover:border-n-blue hover:bg-white hover:text-n-blue">
          확인
        </button>
      </div>
      <ErrorMessage>{errors.email?.message?.toString()}</ErrorMessage>
    </form>
  );
};

export default FindPassword;
