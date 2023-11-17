import { UseFormRegister } from "react-hook-form";
import { IOptionForm } from "./TemplateWrapper";

interface ITemplateDeadLineProps {
  deadline: any;
  register: UseFormRegister<IOptionForm>;
}

const TemplateDeadLine = ({
  register,
  deadline,
}: ITemplateDeadLineProps): JSX.Element => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="flex items-center justify-between">
      <label className="text-n-lg" htmlFor="deadline">
        데드라인
      </label>
      <input
        className="rounded-n-sm border border-n-gray p-[2.5px] outline-none"
        {...register("deadline")}
        defaultValue={deadline ? deadline.split("T")[0] : null}
        id="deadline"
        type="date"
        min={today}
      />
    </div>
  );
};

export default TemplateDeadLine;
