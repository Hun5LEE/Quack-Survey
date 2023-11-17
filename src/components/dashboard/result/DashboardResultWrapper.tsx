interface IDashboardResultWrapperProps {
  number: number;
  title: string;
  children: JSX.Element;
}

const DashboardResultWrapper = ({
  number,
  title,
  children,
}: IDashboardResultWrapperProps) => {
  return (
    <div className="bg-n-white">
      <div className="m-auto flex h-auto w-[360px] pb-n-md">
        <div className="flex h-full w-n-2xl justify-center pt-[12px] text-n-2xl font-bold text-n-gray">
          {number}
        </div>
        <div className="w-full pr-n-md">
          <div className="py-n-md text-n-lg font-bold text-n-black">
            {title}
          </div>
          <div className="max-h-[300px] w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardResultWrapper;
