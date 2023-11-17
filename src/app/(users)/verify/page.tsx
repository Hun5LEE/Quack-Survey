"use client";
import React from "react";
import { Button } from "@/components/users";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

const Verify = (): JSX.Element => {
  const router: AppRouterInstance = useRouter();

  const handleButtonClick = () => {
    router.replace("/login");
  };

  return (
    <div>
      <p className="mb-2 text-center text-3xl">이제 마지막 한걸음 남았어요!</p>
      <p className="mb-2 text-center text-xl">
        가입하신 이메일로 인증메일을 보냈어요.
      </p>
      <p className="mb-2 text-center text-xs">
        ( 이메일 발송에는 최대 5분의 시간이 소요됩니다. )
      </p>
      <p className="mb-2 text-center text-xs">
        ( 인증 메일은 10분간 유효합니다. )
      </p>
      <Button onClick={handleButtonClick}>로그인 페이지 바로가기</Button>
    </div>
  );
};

export default Verify;
