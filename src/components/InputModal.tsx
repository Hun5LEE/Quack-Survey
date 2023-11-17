import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { IOptionForm } from "./templateBuilder/template/TemplateWrapper";

interface IInputModalProps {
  isOpen: boolean;
  submitText: string;
  children: JSX.Element;
  handleSubmit: UseFormHandleSubmit<IOptionForm>;
  onValid: SubmitHandler<IOptionForm>;
  onCancel: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const InputModal = ({
  isOpen,
  submitText,
  children,
  handleSubmit,
  onValid,
  onCancel,
}: IInputModalProps): JSX.Element => {
  return (
    <div
      className={
        isOpen
          ? "fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center opacity-100 transition-opacity"
          : "pointer-events-none fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center opacity-0"
      }
    >
      <div
        className="md-[360px] absolute h-full w-full bg-n-black opacity-30"
        onClick={onCancel}
      />
      <div className="modal z-1 relative flex h-auto w-auto min-w-[280px] flex-col bg-white ">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="h-full w-full p-n-lg">{children}</div>
          <div className="flex h-[52px] w-full items-center justify-around border border-t-n-light-gray px-n-lg text-n-md">
            <button
              type="button"
              onClick={onCancel}
              className="px-n-xs text-n-gray"
            >
              취소
            </button>
            <button type="submit" className="px-n-sm text-n-blue">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
