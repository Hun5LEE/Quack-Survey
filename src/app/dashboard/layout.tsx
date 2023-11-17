import GlobalNavigation from "@/components/GlobalNavigation";
import DashboardNavigation from "@/components/dashboard/DashboardNavigation";

const layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div>
      <DashboardNavigation />
      <div className="m-auto min-h-[620px] w-[360px]">{children}</div>
      <GlobalNavigation />
    </div>
  );
};

export default layout;
