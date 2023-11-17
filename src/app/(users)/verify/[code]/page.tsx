"use client";
import { getFetch } from "@/utils/fetch/core";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { setCookie } from "cookies-next";

const Verify = () => {
  const [count, setCount] = useState<number>(3);
  const router = useRouter();
  const { code } = useParams();

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => --prev);
    }, 1000);

    if (count === 0) {
      (async () => {
        const res = await getFetch(`/users/verify/${code}`);
        setCookie("username", res.data.username);
        router.replace("/home");
      })();
    }

    return () => clearInterval(timer);
  }, [count, code, router]);

  return (
    <div>
      <p className="mb-4 text-center">인증이 완료되었어요. :)</p>
      <p className="text-center">{count} 초 후 홈 화면으로 이동합니다.</p>
    </div>
  );
};

export default Verify;
