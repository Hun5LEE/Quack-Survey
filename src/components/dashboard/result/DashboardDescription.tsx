interface IDashboardDescriptionProps {
  descriptionData: string[];
}

const DashboardDescription = ({
  descriptionData,
}: IDashboardDescriptionProps): JSX.Element => {
  return (
    <div className="flex max-h-[200px] w-full flex-col gap-n-xs overflow-scroll">
      {descriptionData.map((desc, index) => (
        <div
          key={index}
          className="w-full rounded-n-sm bg-n-light-gray px-n-md py-n-xs text-n-sm"
        >
          {desc}
        </div>
      ))}
    </div>
  );
};

export default DashboardDescription;
