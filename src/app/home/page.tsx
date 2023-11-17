"use client";

import { HomeContainer, TemplateItem } from "@/components/home";
import { useGetTemplateLists } from "@/hooks/queries/useGetTemplateLists";
import { handleCreateClick } from "@/utils/home";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import useExpiration from "@/hooks/useExpiration";
import LoadingSpinner from "@/components/LoadingSpinner";

const Home = (): JSX.Element => {
  const router = useRouter();
  const { data, isLoading } = useGetTemplateLists("/template");
  const [isShow, setIsShow] = useState<boolean>(true);
  useExpiration();

  const debounce = (callback: () => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;

    return () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(callback, delay);
    };
  };

  const throttle = (callback: () => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;

    return () => {
      if (!timer) timer = setTimeout(callback, delay);
    };
  };

  if (typeof window !== "undefined") {
    window.addEventListener(
      "scroll",
      debounce(() => {
        setIsShow(false);
      }, 1500),
    );

    window.addEventListener(
      "scroll",
      throttle(() => {
        setIsShow(true);
      }, 0),
    );
  }

  return (
    <div className="relative m-auto max-w-[768px] p-[20px]">
      <h1 className="mb-4">최근 템플릿</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <HomeContainer>
          {data?.map((item) => (
            <TemplateItem
              key={item._id}
              templateId={item._id}
              title={item.title}
              updatedAt={item.updatedAt}
            />
          ))}
        </HomeContainer>
      )}
      {isShow && (
        <div
          className="fixed bottom-[66px] right-[18px] z-[9998] flex h-[36px] w-[36px] cursor-pointer items-center justify-center rounded-lg bg-n-blue opacity-80 duration-100 hover:opacity-100"
          onClick={() => handleCreateClick(router)}
        >
          <Image
            src="/images/create.svg"
            width={30}
            height={30}
            priority={true}
            alt="Documents"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
