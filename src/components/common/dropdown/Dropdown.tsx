import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IDropdown<T> {
  options: { value: T; name: string }[];
  dropdownHandler: (value: T) => void;
  defaultValue: T;
  value: T;
  dropdownContainerStyle?: {
    w?: string;
    h?: string;
    style?: string;
  };
  dropdownOptionStyle?: {
    w?: string;
    style?: string;
    z?: string;
    transformX?: string;
  };
}

export default function Dropdown<T>({
  options,
  dropdownHandler,
  defaultValue,
  value,
  dropdownContainerStyle,
  dropdownOptionStyle,
}: IDropdown<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T>(defaultValue);
  const ref = useRef<HTMLDivElement>(null);
  const [isOnRightSide, setIsOnRightSide] = useState(true);

  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    const checkPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const rightSide = rect.right > windowWidth / 2;
        setIsOnRightSide(rightSide);
      }
    };

    checkPosition();
  };

  const handleOptionClick = (value: T) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div
      className={`relative flex ${dropdownContainerStyle?.h || ""} h-full flex-shrink-0 items-center ${dropdownContainerStyle?.w || ""} text-left`}
      ref={ref}
    >
      <button
        onClick={toggleDropdown}
        className={`inline-flex items-center gap-x-2 ${dropdownContainerStyle?.style || ""} text-sm font-medium text-gray-700 hover:text-main focus:outline-none`}
      >
        <div className={"min-w-fit"}>
          {options.filter((i) => i.value == selectedOption)[0].name}
        </div>
        {isOpen ? (
          <Image
            src="/common/dropdown-down-arrow.svg"
            className="translate-y-[50%] rotate-180"
            alt="location-icon"
            width={8}
            height={4}
          />
        ) : (
          <Image
            src="/common/dropdown-down-arrow.svg"
            className="translate-y-[25%]"
            alt="location-icon"
            width={8}
            height={4}
          />
        )}
      </button>

      {isOpen &&
        (isOnRightSide ? (
          <div
            className={`absolute top-0 ${dropdownOptionStyle?.z || ""} ${dropdownOptionStyle?.w || ""} flex ${dropdownOptionStyle?.style || ""} flex-col items-center gap-1 bg-white/95 text-gray1 shadow transition duration-200 ease-out`}
            style={{
              transform: dropdownOptionStyle?.transformX
            }}
          >
            {options.map((i) => (
              <button
                key={i.name}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
                className={`flex h-16 w-full items-center justify-center hover:text-main ${
                  selectedOption === i.value ? "bg-white text-main" : ""
                }`}
                role="menuitem"
              >
                {i.name}
              </button>
            ))}
          </div>
        ) : (
          <div
            className={`absolute top-0 ${dropdownOptionStyle?.z || ""} ${dropdownOptionStyle?.w || ""} flex ${dropdownOptionStyle?.style || ""} flex-col items-center gap-1 bg-white/95 text-gray1 shadow transition duration-200 ease-out`}
          >
            {options.map((i) => (
              <button
                key={i.name}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
                className={`flex h-16 w-full items-center justify-center hover:text-main ${
                  selectedOption === i.value ? "bg-white text-main" : ""
                }`}
                role="menuitem"
              >
                {i.name}
              </button>
            ))}
          </div>
        ))}
    </div>
  );
}
