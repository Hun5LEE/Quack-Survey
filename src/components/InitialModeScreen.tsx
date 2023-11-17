interface IInitialModeScreenProps {
  innerText?: string;
  onCreateTemplate: any;
}

const InitialModeScreen = ({
  innerText,
  onCreateTemplate,
}: IInitialModeScreenProps): JSX.Element => {
  return (
    <div>
      <div
        onClick={onCreateTemplate}
        className="flex h-screen w-screen min-w-[360px] cursor-pointer items-center justify-center bg-n-light-gray text-center font-[bold] text-n-xl text-n-gray"
      >
        {innerText}
      </div>
    </div>
  );
};

export default InitialModeScreen;
