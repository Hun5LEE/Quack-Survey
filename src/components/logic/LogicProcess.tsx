import Image from "next/image";

interface ILogicProcessProps {
  modeName: string;
  createDescription: string;
}

const LogicProcess = ({
  modeName,
  createDescription,
}: ILogicProcessProps): JSX.Element => {
  return (
    <>
      <div className="m-auto mt-[56px] flex h-[100px] w-[250px]">
        <div className="flex w-full items-center">
          <div className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full bg-n-light-black p-1.5">
            <Image src="/images/type.svg" alt="" height={18} width={18} />
          </div>
          <div
            className={`h-1 w-full  ${
              modeName === "type" ? "bg-n-light-gray" : "bg-n-light-black"
            }`}
          ></div>
        </div>
        <div className="flex w-full items-center">
          <div
            className={`flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full  p-1.5 ${
              modeName === "type" ? "bg-n-light-gray" : "bg-n-light-black"
            }`}
          >
            <Image src="/images/check.svg" alt="" height={18} width={18} />
          </div>
          <div
            className={`h-1 w-full ${
              modeName === "select" || modeName === "type"
                ? "bg-n-light-gray"
                : "bg-n-light-black"
            }`}
          ></div>
        </div>
        <div className="flex items-center">
          <div
            className={`flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full  p-1.5 ${
              modeName === "form" ? "bg-n-light-black" : "bg-n-light-gray"
            }`}
          >
            <Image src="/images/link.svg" alt="" height={18} width={18} />
          </div>
        </div>
      </div>
      <p className="text-center text-n-xl font-bold">{createDescription}</p>
    </>
  );
};

export default LogicProcess;
