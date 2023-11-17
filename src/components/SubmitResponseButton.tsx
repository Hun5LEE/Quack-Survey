import Image from "next/image";

interface ISubmitResponseButtonProps {
  buttonText: string;
}
const SubmitResponseButton = ({
  buttonText,
}: ISubmitResponseButtonProps): JSX.Element => {
  return (
    <div>
      <div className="fixed bottom-0 left-0 flex h-[56px] w-full min-w-[360px] text-center leading-[56px] text-n-white">
        <button
          className="h-full w-full min-w-[181px] bg-n-blue text-center text-n-xl leading-[56px] text-[white]"
          type="submit"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SubmitResponseButton;
