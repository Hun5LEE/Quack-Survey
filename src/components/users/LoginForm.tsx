import React from "react";

interface ILoginFormProps {
  children: JSX.Element;
}

const LoginForm = ({ children }: ILoginFormProps): JSX.Element => {
  return <div className="w-full">{children}</div>;
};

export default LoginForm;
