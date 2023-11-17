import React, { useEffect, useState } from "react";
import Image from "next/image";

interface IToastProps {
  toastText: string;
  editMode?: boolean;
  onClose: () => void;
}

const Toast = ({ toastText, onClose, editMode }: IToastProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1500);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 1800);

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div
      className={
        visible
          ? `z-100 fixed bottom-[65px] left-[16px] flex h-[43px] min-w-[150px] max-w-[240px] items-center gap-n-sm overflow-hidden bg-n-white p-n-md text-n-md  ${
              editMode ? "text-n-black" : "text-n-red"
            } shadow-n-md transition-all`
          : "overflow-hiddenmin-w-[150px] z-100 shadow-n-base fixed bottom-[65px] left-[16px] flex h-[43px] max-w-[240px] items-center gap-n-sm bg-n-white p-n-md text-n-md opacity-0 transition-all"
      }
    >
      <Image
        src={`/images/${editMode ? "check_black" : "warning"}.svg`}
        alt=""
        width={24}
        height={24}
      />
      <span>{toastText}</span>
    </div>
  );
};

export default Toast;
