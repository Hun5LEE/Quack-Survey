interface IToggleButtonProps {
  toggle: boolean;
  handleToggleButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ToggleButton = ({
  toggle,
  handleToggleButton,
}: IToggleButtonProps): JSX.Element => {
  return (
    <button
      className={`flex  items-center border border-n-gray w-[3.5rem] h-[1.75rem] rounded-[20px] ease-linear duration-300 ${
        toggle === false ? "bg-white  " : "bg-n-blue "
      }`}
      onClick={handleToggleButton}
    >
      <div
        className={`bg-white border border-n-gray rounded-full w-[1.75rem] h-[1.75rem] ease-linear duration-100 ${
          toggle === false ? "translate-x-0" : " translate-x-full"
        }`}
      ></div>
    </button>
  );
};

export default ToggleButton;
