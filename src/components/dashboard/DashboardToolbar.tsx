"use client";

import Image from "next/image";
import ToolTip from "../ToolTip";

interface IDashboardToolbarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const DashboardToolbar = ({
  isOpen,
  onOpen,
  onClose,
}: IDashboardToolbarProps): JSX.Element => {
  return (
    <div>
      <ToolTip
        isOpen={isOpen}
        bottom={"[1px]"}
        onCancel={() => {
          onClose();
        }}
      >
        {/* 데이터 매핑 필요 */}
        <div className="flex flex-col gap-n-xs pl-n-xs pr-n-sm  text-n-sm text-n-white">
          <div>
            <label>
              <input type="checkbox"></input> 당연히 그러할 것이다
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"></input> 당연히 그러할 것이다
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"></input> 당연히 그러할 것이다
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"></input> 당연히 그러할 것이다
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox"></input> 당연히 그러할 것이다
            </label>
          </div>
        </div>
      </ToolTip>
      <div className="fixed bottom-[48px] left-0 flex h-[49px] w-full min-w-[360px] justify-between bg-n-light-black px-n-md py-n-sm">
        <div className="flex items-center gap-n-sm">
          {["up", "down"].map((image, index) => (
            <button
              key={index}
              onClick={() => {}}
              className="flex h-[34px] w-[34px] items-center justify-center rounded-[5px] bg-[#7f7f7f]"
            >
              <Image
                priority
                src={`/images/${image}.svg`}
                alt=""
                width={24}
                height={24}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-n-sm">
          <div className="mr-n-sm h-[30px] w-[1px] bg-n-dark-gray"></div>{" "}
          <button
            onClick={() => {
              onOpen();
            }}
            className="flex h-[34px] w-[51px]  items-center justify-center rounded-[5px] bg-n-blue"
          >
            <Image
              priority
              src="/images/filter.svg"
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardToolbar;
