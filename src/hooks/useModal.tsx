import { useState } from "react";

interface IModalContainerProps {
  children?: JSX.Element | JSX.Element[];
  title?: string;
}

interface IUseModal {
  (callback?: () => void): {
    ModalContainer: ({
      children,
      title,
    }: IModalContainerProps) => false | JSX.Element;
    openModal: () => void;
    closeModal: () => void;
  };
}

const useModal: IUseModal = (callback) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const handleConfirm = () => {
    if (callback) callback();
    closeModal();
  };

  const ModalContainer = ({ children, title }: IModalContainerProps) => {
    return (
      isOpen && (
        <div
          className="fixed left-0 top-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/30"
          onClick={(event) => {
            if (event.currentTarget === event.target) closeModal();
          }}
        >
          <div className="min-w-[320px] max-w-[360px] border border-t-n-light-gray bg-white p-n-lg text-n-md">
            <p className="text-center text-n-lg">{title}</p>
            <div className="py-10">{children}</div>
            <div className="flex justify-around">
              {callback && (
                <button
                  className="h-[36px] w-full bg-n-blue text-n-lg text-white hover:border-[1px] hover:border-solid hover:border-n-blue hover:bg-white hover:text-n-blue"
                  onClick={handleConfirm}
                >
                  확인
                </button>
              )}
              <button
                className="h-[36px] w-full border-[1px] border-gray-400 text-n-lg text-gray-400 hover:bg-gray-400 hover:text-white"
                onClick={closeModal}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )
    );
  };

  return { ModalContainer, openModal, closeModal };
};

export default useModal;
