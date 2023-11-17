interface ILogicHeaderProps {
  title: string;
}

const LogicHeader = ({ title }: ILogicHeaderProps): JSX.Element => {
  return (
    <div className="fixed top-0 flex h-[56px] w-full min-w-[360px] items-center justify-center border-b border-solid border-n-light-gray bg-n-white">
      <span className="flex gap-n-sm">{title}</span>
    </div>
  );
};

export default LogicHeader;
