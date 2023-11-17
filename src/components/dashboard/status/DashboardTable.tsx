interface ItableData {
  quater: string;
  targetRatio: string;
  calculatedRatio: string;
}

interface IDashboardTableProps {
  tableData: ItableData[];
}
const DashboardTable = ({ tableData }: IDashboardTableProps) => {
  return (
    <div className="mt-n-md w-full ">
      <table className="w-full text-center text-sm font-light">
        <thead className="border-b font-medium dark:border-neutral-500 dark:text-neutral-800">
          <tr>
            <th scope="col" className=" px-n-md py-n-md">
              구분
            </th>
            <th scope="col" className=" px-n-md py-n-md">
              목표비율
            </th>
            <th scope="col" className=" px-n-md py-n-md">
              실제비율
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((data: ItableData, index: number) => (
            <tr key={index} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap  px-n-md py-n-md font-medium">
                {data.quater}
              </td>
              <td className="whitespace-nowrap  px-n-md py-n-md">
                {data.targetRatio}
              </td>
              <td className="whitespace-nowrap  px-n-md py-n-md">
                {data.calculatedRatio}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardTable;
