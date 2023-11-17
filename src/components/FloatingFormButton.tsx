import Image from "next/image";

interface IFloatingFormButtonProps {
  imageName: string;
  imageSize: number;
  isBlocked?: boolean;
  onClick: () => void;
}

const FloatingFormButton = ({
  imageName,
  imageSize,
  isBlocked,
  onClick,
}: IFloatingFormButtonProps): JSX.Element => {
  return (
    <div>
      {isBlocked ? (
        <div className="flex h-[50px] w-[50px] items-center justify-center rounded-n-full bg-n-light-black shadow-n-md"></div>
      ) : (
        <button
          onClick={onClick}
          className="flex h-[50px] w-[50px] items-center justify-center rounded-n-full bg-n-white shadow-n-md"
        >
          <Image
            priority
            src={`/images/${imageName}.svg`}
            width={imageSize}
            height={imageSize}
            alt=""
          />
        </button>
      )}
    </div>
  );
};

export default FloatingFormButton;
