import LogoBar from "@/components/LogoBar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <>
      <LogoBar modeName="dark" />
      <div className="m-auto w-[360px]">{children}</div>
      <div className="fixed left-0 top-0 -z-50 h-screen w-full bg-n-light-gray "></div>
    </>
  );
};

export default layout;
