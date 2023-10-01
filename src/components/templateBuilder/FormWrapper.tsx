import FormTitle from "./FormTitle";
import FormOption from "./FormOption";
import FormContentSelect from "./FormContentSelect";
import FormContentText from "./FormContentText";

interface IFormWrapperProps {}

const FormWrapper = ({}: IFormWrapperProps): JSX.Element => {
  return (
    <div
      className={`h-full w-[360px] flex-col border-l-[8px] border-n-dark-gray bg-white ${"복수형 응답이면 border을 dotted"} ${"수정모드 일때 border보라색으로"}`}
    >
      <div className="pb-n-xlg ml-n-sm pt-n-sm">
        <FormTitle />
        <div className={`flex ${"옵션 및 로직이 있으면" ? null : "ml-n-xlg"}`}>
          {"옵션 및 로직이 있으면" ? <FormOption /> : null}
          {true ? <FormContentSelect /> : <FormContentText />}
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
