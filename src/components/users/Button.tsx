import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
}

const Button = ({ children, ...props }: ButtonProps): JSX.Element => {
  return (
    <button
      {...props}
      className="my-[30px] h-[50px] w-full min-w-[280px] rounded-n-md bg-n-blue text-n-lg text-white hover:border-[1px] hover:border-solid hover:border-n-blue hover:bg-white hover:text-n-blue disabled:cursor-not-allowed disabled:border-none disabled:bg-n-light-gray disabled:text-n-light-black"
    >
      {children}
    </button>
  );
};

export default Button;
