import Image from "next/image";

interface IFloatingTemplateButtonProps {
  onCreate: () => void;
}

const FloatingTemplateButton = ({
  onCreate,
}: IFloatingTemplateButtonProps): JSX.Element => {
  return (
    <div>
      <button
        onClick={onCreate}
        className="fixed bottom-[66px] right-[16px] flex h-[50px] w-[50px] items-center justify-center rounded-n-md bg-n-light-blue shadow-n-md"
      >
        <Image
          priority
          src="/images/create.svg"
          width={28}
          height={28}
          alt=""
        />
      </button>
    </div>
  );
};

export default FloatingTemplateButton;
