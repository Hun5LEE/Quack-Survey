import { ForwardedRef, InputHTMLAttributes, forwardRef } from "react";

interface IUserDataInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
}

const UserDataInput = forwardRef(
  (
    { isError, ...props }: IUserDataInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): JSX.Element => {
    return (
      <input
        className={`
          mt-[15px] h-[50px] w-full min-w-[280px] rounded-n-md border-[1px] border-solid bg-n-light-gray p-5 text-n-lg text-n-light-black
          ${isError ? "border-rose-400" : ""}
        `}
        ref={ref}
        {...props}
      />
    );
  },
);

export default UserDataInput;
