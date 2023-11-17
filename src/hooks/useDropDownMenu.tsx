import { useEffect, useRef, useState } from "react";

interface IDropDownMenuProps {
  items?: { title: string; callback: () => void }[];
}

const useDropDownMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<"DOWN" | "UP">("DOWN");

  const openMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    const windowHeight = window.innerHeight;
    const clickedPositionY = event.screenY;

    if (windowHeight - clickedPositionY < 20) setPosition("UP");
    else setPosition("DOWN");

    setIsOpen(true);
  };

  const closeMenu = () => setIsOpen(false);

  const getPosition = (positionY: "DOWN" | "UP") => {
    if (positionY === "DOWN") return "top-[0px] right-[10px]";
    else if (positionY === "UP") return "bottom-[0px] right-[10px]";
  };

  const DropDownMenu = ({ items }: IDropDownMenuProps) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const handleClicked = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node))
        closeMenu();
    };

    useEffect(() => {
      if (isOpen) window.addEventListener("mousedown", handleClicked);

      return () => {
        window.removeEventListener("mousedown", handleClicked);
      };
    }, []);

    return (
      isOpen && (
        <div
          ref={ref}
          className={`absolute z-[10] rounded-lg bg-n-black p-2 text-n-xs text-n-light-gray ${getPosition(
            position,
          )}`}
        >
          {items?.map((item) => (
            <div className="w-max" key={item.title}>
              <button className="cursor-pointer" onClick={item.callback}>
                {item.title}
              </button>
            </div>
          ))}
          <div className="w-max">
            <button className="cursor-pointer" onClick={closeMenu}>
              취소
            </button>
          </div>
        </div>
      )
    );
  };

  return { DropDownMenu, openMenu, closeMenu };
};

export default useDropDownMenu;
