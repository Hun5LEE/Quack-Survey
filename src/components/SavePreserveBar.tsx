import { read } from "@/constants/mode";
import Image from "next/image";

interface ISavePreserveProps {
  modeName?: string;
  onOption?: () => void;
  onNavigateHome?: () => void;
  onPreview?: () => void;
  onSave?: () => void;
}

const SavePreserveBar = ({
  modeName,
  onOption,
  onNavigateHome,
  onPreview,
  onSave,
}: ISavePreserveProps): JSX.Element => {
  return (
    <div className="fixed top-0  h-[56px] w-full min-w-[360px] bg-n-light-black  p-n-md ">
      {modeName === read ? (
        <div className="flex   justify-between   text-n-white">
          <div className="flex gap-n-md">
            <button onClick={onOption} type="button">
              <Image
                priority
                src="/images/more.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          </div>
          <div className="flex gap-n-md">
            <button onClick={onNavigateHome}>홈으로</button>
            <button onClick={onPreview}>미리보기</button>
            <button onClick={onSave}>저장</button>
          </div>
        </div>
      ) : (
        <div className="flex justify-end text-n-white">
          <div className="flex gap-n-md">
            <button onClick={onNavigateHome}>홈으로</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavePreserveBar;
