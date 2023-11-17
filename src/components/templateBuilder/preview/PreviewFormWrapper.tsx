import { Form } from "@/types/mongooseType";

interface IPreviewFormWrapperProps {
  form: Form;
  index: number;
}

const PreviewFormWrapper = ({
  form,
  index,
}: IPreviewFormWrapperProps): JSX.Element => {
  const { _id, title, select, type, required, plural } = form;
  return (
    <div
      className={`mb-3 h-full w-[360px] flex-col border-l-[8px]  border-n-light-blue bg-white py-2`}
    >
      <div className="flex">
        {required ? (
          <span className="mb-3 ml-3 text-n-xs">( 필수항목 )</span>
        ) : null}
        {plural ? (
          <span className="mb-3 ml-3 text-n-xs">( 모두선택 )</span>
        ) : null}
      </div>
      <div className="mx-2 mb-3 flex items-center">
        <span className={`mr-n-sm self-start text-n-xl text-n-light-blue`}>
          {index + 1}
        </span>
        <p>{title}</p>
      </div>
      {type === "select" ? (
        <div className="space-y-n-sm">
          {select?.map((text: string, i) => {
            return (
              <div key={`${_id}_${i}`} className="ml-8 mr-2">
                <div className="h-n-xlg flex w-[85%] items-center rounded-n-sm  bg-n-light-gray">
                  <div className="flex w-full">
                    <label className="mx-n-sm w-full shrink-0 cursor-pointer bg-inherit py-[5px] text-n-sm outline-none">
                      {text}
                    </label>
                    <input type="checkbox" defaultChecked={false} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <textarea
          className="ml-8 mr-2 h-[240px] w-[300px] resize-none rounded-md border border-n-blue p-2 text-n-sm"
          placeholder="답변을 입력해주세요."
          disabled
        />
      )}
    </div>
  );
};

export default PreviewFormWrapper;
