import ToolbarTypeCase from "../../ToolbarTypingCase";

interface IFormContentTextProps {
  editMode: boolean;
}

const FormContentText = ({ editMode }: IFormContentTextProps): JSX.Element => {
  return (
    <>
      <div className="w-full">
        <textarea
          className="w-[90%] resize-none bg-white outline-none"
          placeholder="답변을 작성해주세요."
          disabled={true}
        />
      </div>
      {editMode ? <ToolbarTypeCase modeName="text" /> : null}
    </>
  );
};

export default FormContentText;
