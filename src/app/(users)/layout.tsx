import Image from "next/image";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="m-auto h-screen max-w-[768px] px-[20px]">
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="relative mb-[30px] h-[41px] min-w-[280px]">
          <Image
            className="max-w-[280px]"
            src="/images/quack_survey.png"
            fill={true}
            priority={true}
            sizes="(min-width: 0px) 100vw"
            alt="Quack Survey"
          />
        </div>
        {children}
      </div>
    </div>
  );
};

export default layout;
