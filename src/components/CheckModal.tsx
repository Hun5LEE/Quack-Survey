interface ICheckModalProps {
  isOpen: boolean;
  modalText: string;
  buttonText: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const CheckModal = ({
  onCancel,
  onConfirm,
  isOpen,
  modalText,
  buttonText,
}: ICheckModalProps): JSX.Element => {
  return (
    <div
      className={
        isOpen
          ? "z-100 fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-100 transition-opacity"
          : "z-100 pointer-events-none fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-0"
      }
    >
      <div
        className="absolute h-full w-full min-w-[360px] bg-n-black opacity-30"
        onClick={onCancel}
      />
      <div className="modal z-1 rounded-n-lg relative h-[142px] w-auto min-w-[313px] bg-n-white p-n-md shadow-n-md">
        <div className="flex h-full flex-col items-stretch gap-n-md text-n-lg">
          <p className="flex h-[94px] items-center justify-center text-center">
            {modalText}
          </p>
          <div className="w-100% rounded-n-lg h-[40px] bg-n-blue text-center leading-[40px] text-n-white">
            <button className="min-w-[115px]" onClick={onConfirm}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
