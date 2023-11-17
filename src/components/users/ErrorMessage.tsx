import React from "react";

interface IErrorMessage {
  children?: string;
}

const ErrorMessage = ({ children }: IErrorMessage) => {
  return <p className="flex px-2 pt-1 text-n-xs  text-rose-500">{children}</p>;
};

export default ErrorMessage;
