import Image from "next/image";

interface IFormOptionProps {
  editMode: boolean;
  isLogic: boolean;
  isTemplateOption: boolean;
}

const FormOption = ({
  editMode,
  isLogic,
  isTemplateOption,
}: IFormOptionProps): JSX.Element => {
  return (
    <div className="mr-n-sm w-n-xl space-y-n-lg self-center">
      {isLogic ? (
        <Image
          src={editMode ? "/images/logic_b.svg" : "/images/logic_g.svg"}
          width={24}
          height={24}
          alt=""
          priority
        />
      ) : null}
      {isTemplateOption ? (
        <Image
          src={editMode ? "/images/quater_b.svg" : "/images/quater_g.svg"}
          width={24}
          height={24}
          alt=""
          priority
        />
      ) : null}
    </div>
  );
};

export default FormOption;
