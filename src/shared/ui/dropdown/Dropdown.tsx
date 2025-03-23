import { useOutsideClick } from "@/shared/lib/hooks";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface DropdownProps<T> {
  options: { value: T; name: string }[];
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
  dropdownHandler: (value: T) => void;
}

export const Dropdown = <T,>({
  options,
  defaultValue,
  value,
  dropdownContainerStyle,
  dropdownOptionStyle,
  dropdownHandler,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T>(defaultValue);
  const ref = useRef<HTMLDivElement>(null);
  const [isOnRightSide, setIsOnRightSide] = useState(true);

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

  useOutsideClick(ref, () => setIsOpen(false));

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div
      className={`relative flex ${dropdownContainerStyle?.h || ""} h-full shrink-0 items-center ${dropdownContainerStyle?.w || ""} text-left`}
      ref={ref}
    >
      <button
        onClick={toggleDropdown}
        className={`inline-flex items-center gap-x-2 ${dropdownContainerStyle?.style || ""} hover:text-main text-sm font-medium text-gray-700 focus:outline-hidden`}
      >
        <div className="min-w-fit">
          {options.filter((i) => i.value == selectedOption)[0].name}
        </div>
        {isOpen ? (
          <Image
            src="/icons/dropdown-down-arrow.svg"
            className="translate-y-[50%] rotate-180"
            alt="dropdown-down-arrow"
            width={8}
            height={4}
          />
        ) : (
          <Image
            src="/icons/dropdown-down-arrow.svg"
            className="translate-y-[25%]"
            alt="dropdown-down-arrow"
            width={8}
            height={4}
          />
        )}
      </button>
      {isOpen &&
        (isOnRightSide ? (
          <div
            className={`absolute top-0 ${dropdownOptionStyle?.z || ""} ${dropdownOptionStyle?.w || ""} flex ${dropdownOptionStyle?.style || ""} text-gray1 flex-col items-center gap-1 bg-white/95 shadow-sm transition duration-200 ease-out`}
            style={{
              transform: dropdownOptionStyle?.transformX,
            }}
          >
            {options.map((i) => (
              <button
                key={i.name}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
                className={`hover:text-main flex h-16 w-full items-center justify-center ${
                  selectedOption === i.value ? "text-main bg-white" : ""
                }`}
                role="menuitem"
              >
                {i.name}
              </button>
            ))}
          </div>
        ) : (
          <div
            className={`absolute top-0 ${dropdownOptionStyle?.z || ""} ${dropdownOptionStyle?.w || ""} flex ${dropdownOptionStyle?.style || ""} text-gray1 flex-col items-center gap-1 bg-white/95 shadow-sm transition duration-200 ease-out`}
          >
            {options.map((i) => (
              <button
                key={i.name}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
                className={`hover:text-main flex h-16 w-full items-center justify-center ${
                  selectedOption === i.value ? "text-main bg-white" : ""
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
};
