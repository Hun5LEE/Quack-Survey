import { Form, Logic, TemplateOption } from "@/types/mongooseType";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { useUpdateForm } from "@/hooks/mutation/useUpdateForm";
import { read } from "@/constants/mode";
import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
import Toast from "../../Toast";

interface IFormsBoardProps {
  isFold: boolean;
  modeName: string;
  newOrder: number;
  templateBuilderId: string | string[];
  forms: Form[];
  logics: Logic[];
  templateOption: TemplateOption;
  setModeName: React.Dispatch<React.SetStateAction<string>>;
  createMutate: any;
}

const FormsBoard = ({
  isFold,
  modeName,
  newOrder,
  templateBuilderId,
  forms,
  logics,
  templateOption,
  setModeName,
  createMutate,
}: IFormsBoardProps): JSX.Element => {
  const [toastText, setToastText] = useState("");

  const { mutate: updateMutate } = useUpdateForm(
    "/form/order",
    templateBuilderId,
    "forms",
  );

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    const logicExistingIndex = logics.findIndex(
      (logic: Logic) => logic.formId === draggableId,
    );
    if (logicExistingIndex !== -1) {
      const existingLogic = logics[logicExistingIndex];
      const formExistingIndex = forms.findIndex(
        (form) => form._id === existingLogic.appliedFormId,
      );
      if (formExistingIndex <= destination.index) {
        return setToastText(
          "로직이 걸려있어 해당폼보다 밑으로 갈 수 없습니다.",
        );
      }
    }

    const formsData: string[] | null = [];
    forms.forEach((form) => formsData.push(form._id));
    formsData.splice(source.index, 1);
    formsData.splice(destination?.index, 0, draggableId);
    updateMutate(formsData);
  };

  const handleClose = () => {
    setToastText("");
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="one">
          {(provided) => (
            <div
              className="mb-[60px] space-y-n-md"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {forms?.map((form: Form, i: number) => (
                <Draggable
                  key={form._id}
                  draggableId={form._id}
                  index={i}
                  isDragDisabled={modeName === read ? false : true}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      <FormWrapper
                        index={i}
                        newOrder={newOrder}
                        logics={logics}
                        setToastText={setToastText}
                        templateOption={templateOption}
                        templateBuilderId={templateBuilderId}
                        form={form}
                        isFold={isFold}
                        setModeName={setModeName}
                        modeName={modeName}
                        createMutate={createMutate}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {toastText !== "" ? (
        <Toast toastText={toastText} onClose={handleClose} editMode={false} />
      ) : null}
    </>
  );
};

export default React.memo(FormsBoard);
