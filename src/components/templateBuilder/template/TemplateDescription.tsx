import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import ToolbarTypeCase from "../../ToolbarTypingCase";

interface ITemplateDescriptionProps {
  title?: string;
  description?: string;
  editMode: boolean;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  onValid: SubmitHandler<FieldValues>;
}

const TemplateDescription = ({
  title,
  description,
  editMode,
  handleSubmit,
  register,
  onValid,
}: ITemplateDescriptionProps): JSX.Element => {
  return (
    <div
      className={`mb-n-md mt-[60px] h-full w-[360px] rounded-t-n-md border-t-[16px] bg-white transition duration-100 ease-in-out ${
        editMode ? "border-n-light-blue" : "cursor-pointer border-n-dark-gray"
      }`}
    >
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col space-y-n-sm p-n-md "
      >
        <input
          className="bg-white text-n-lg outline-none"
          placeholder="제목을 작성해주세요."
          defaultValue={title}
          disabled={!editMode}
          maxLength={19}
          {...register("title", {
            required: "제목을 작성해주세요.",
          })}
        />
        <textarea
          className={` resize-none bg-white text-n-sm outline-none`}
          placeholder="해당 설문조사에 대한 설명을 작성해주세요."
          defaultValue={description}
          disabled={!editMode}
          {...register("description", {
            required: "설명란을 작성해주세요.",
          })}
          maxLength={200}
        />
        {editMode ? <ToolbarTypeCase modeName="text" /> : null}
      </form>
    </div>
  );
};

export default TemplateDescription;
