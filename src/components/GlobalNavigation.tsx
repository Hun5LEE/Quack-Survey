"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navigation = (): JSX.Element => {
  const pathName = usePathname();
  const splitPathName = pathName.split("/")[1];

  return (
    <nav>
      <div
        className={
          "fixed bottom-0 z-[9998] h-[48px] w-full min-w-[360px] bg-n-blue text-n-white"
        }
      >
        <div className="m-auto flex h-[48px] w-[360px]">
          <Link
            href="/dashboard/status"
            className={
              splitPathName === "dashboard"
                ? "box-border flex w-[120px] items-center justify-center border-b-[5px] border-n-white opacity-100"
                : "flex w-[120px] items-center justify-center opacity-20"
            }
          >
            <Image
              priority
              src="/images/dashboard.svg"
              alt=""
              width={24}
              height={24}
            />
          </Link>
          <Link
            href="/home"
            className={
              splitPathName === "home"
                ? "box-border flex w-[120px] items-center justify-center border-b-[5px] border-n-white opacity-100"
                : "flex w-[120px] items-center justify-center opacity-20"
            }
          >
            <Image
              priority
              src="/images/home.svg"
              alt=""
              width={24}
              height={24}
            />
          </Link>
          <Link
            href="/mypage"
            className={
              splitPathName === "mypage"
                ? "box-border flex w-[120px] items-center justify-center border-b-[5px] border-n-white opacity-100"
                : "flex w-[120px] items-center justify-center opacity-20"
            }
          >
            <Image
              priority
              src="/images/mypage.svg"
              alt=""
              width={24}
              height={24}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
