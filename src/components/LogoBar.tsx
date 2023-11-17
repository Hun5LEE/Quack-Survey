import Image from "next/image";

interface ILogoBarProps {
  modeName: string; //light | dark
}

const LogoBar = ({ modeName }: ILogoBarProps): JSX.Element => {
  return (
    <div>
      {modeName === "light" ? (
        <div className="fixed top-0 z-50 flex h-[56px] w-full min-w-[360px] items-center justify-center border-b border-solid border-n-light-gray bg-n-white">
          <div className="flex items-center gap-n-sm">
            <div className="flex h-[30px] w-[43px] items-center">
              <Image
                src="/images/logo.png"
                width={360}
                height={169}
                alt=""
                priority
              />
            </div>
            <div className="flex h-[30px] w-[136px] items-center">
              <Image
                src="/images/quack_survey.png"
                width={360}
                height={51}
                alt=""
                priority
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed top-0 flex h-[56px] w-full min-w-[360px] items-center  justify-center border-b border-solid border-n-light-gray bg-n-black">
          <div className="flex items-center gap-n-sm">
            <div className="flex h-[30px] w-[43px] items-center">
              <Image
                src="/images/logo_black.png"
                width={360}
                height={169}
                alt=""
                priority
              />
            </div>
            <div className="flex h-[30px] w-[136px] items-center">
              <Image
                src="/images/quack_survey_black.png"
                width={360}
                height={51}
                alt=""
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoBar;
