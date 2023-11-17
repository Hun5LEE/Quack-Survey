import React from "react";

interface ISingupFormProps {
  children: JSX.Element;
}

const SignupForm = ({ children }: ISingupFormProps): JSX.Element => {
  return <div className="w-full">{children}</div>;
};

export default SignupForm;
