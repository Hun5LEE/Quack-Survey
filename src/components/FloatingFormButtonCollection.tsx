import FloatingFormButton from "./FloatingFormButton";

interface IFloatingFormButtonCollectionProps {
  onCreateForm?: (type: string, plural: boolean) => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
  onCreateLogic?: () => void;
  modeName: string;
  isBlocked?: boolean;
}

const FloatingFormButtonCollection = ({
  modeName,
  isBlocked,
  onCreateForm,
  onDuplicate,
  onDelete,
  onCreateLogic,
}: IFloatingFormButtonCollectionProps): JSX.Element => {
  return (
    <div className={`fixed bottom-[67px] right-[18px] h-[181px] w-[50px] `}>
      {modeName === "read" ? (
        <div className="flex flex-col gap-n-md">
          <FloatingFormButton
            onClick={() => onCreateForm!("select", false)}
            imageName={"single"}
            imageSize={18}
          />
          <FloatingFormButton
            onClick={() => onCreateForm!("select", true)}
            imageName={"plural"}
            imageSize={24}
          />
          <FloatingFormButton
            onClick={() => onCreateForm!("text", false)}
            imageName={"description"}
            imageSize={24}
          />
        </div>
      ) : (
        <div>
          <div className="flex flex-col gap-n-md">
            <FloatingFormButton
              onClick={onDuplicate!}
              imageName={"duplicate_black"}
              imageSize={18}
            />
            <FloatingFormButton
              onClick={onDelete!}
              imageName={"trash"}
              imageSize={24}
            />
            <FloatingFormButton
              onClick={onCreateLogic!}
              isBlocked={isBlocked}
              imageName={"logic"}
              imageSize={24}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingFormButtonCollection;
