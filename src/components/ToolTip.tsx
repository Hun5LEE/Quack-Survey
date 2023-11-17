interface IToolTipProps {
  isOpen: boolean;
  bottom: number;
  children: JSX.Element;
  onCancel: () => void;
}

const ToolTip = ({ isOpen, bottom, children, onCancel }: IToolTipProps) => {
  return (
    <div>
      <div
        className={
          isOpen
            ? "z-100 fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-100 transition-opacity"
            : "z-100 pointer-events-none fixed left-0 top-0 flex h-screen w-screen items-center justify-center opacity-0"
        }
      >
        <div
          className="md-[360px] absolute h-full w-full bg-n-white opacity-0"
          onClick={onCancel}
        />
        <div
          className={`fixed right-n-md bottom-[${bottom}px] max-w-[192px] rounded-n-md bg-n-light-black p-n-sm shadow-n-md`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
