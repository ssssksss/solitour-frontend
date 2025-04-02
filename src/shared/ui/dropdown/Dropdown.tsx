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
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T>(defaultValue);
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
      className={[
        dropdownContainerStyle?.w,
        dropdownContainerStyle?.h,
        "relative flex h-full shrink-0 items-center text-left",
      ].join(" ")}
      ref={ref}
    >
      <button
        className={[
          dropdownContainerStyle?.style,
          "hover:text-main inline-flex items-center gap-x-2 text-sm font-medium text-gray-700 focus:outline-hidden",
        ].join(" ")}
        onClick={toggleDropdown}
      >
        <div className="min-w-fit">
          {options.filter((i) => i.value == selectedOption)[0].name}
        </div>
        <Image
          className={
            isOpen ? "translate-y-[50%] rotate-180" : "translate-y-1/4"
          }
          src="/icons/dropdown-down-arrow.svg"
          alt="dropdown-down-arrow"
          width={8}
          height={4}
        />
      </button>
      {isOpen &&
        (isOnRightSide ? (
          <div
            className={[
              dropdownOptionStyle?.z || "",
              dropdownOptionStyle?.w || "",
              dropdownOptionStyle?.style || "",
              "text-gray1 absolute top-0 flex flex-col items-center gap-1 bg-white/95 shadow-sm transition duration-200 ease-out",
            ].join(" ")}
            style={{ transform: dropdownOptionStyle?.transformX }}
          >
            {options.map((i) => (
              <button
                key={i.name}
                className={[
                  selectedOption === i.value ? "text-main bg-white" : "",
                  "hover:text-main flex h-16 w-full items-center justify-center",
                ].join(" ")}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
                role="menuitem"
              >
                {i.name}
              </button>
            ))}
          </div>
        ) : (
          <div
            className={[
              dropdownOptionStyle?.z || "",
              dropdownOptionStyle?.w || "",
              dropdownOptionStyle?.style || "",
              "text-gray1 absolute top-0 flex flex-col items-center gap-1 bg-white/95 shadow-sm transition duration-200 ease-out",
            ].join(" ")}
          >
            {options.map((i) => (
              <button
                key={i.name}
                className={[
                  selectedOption === i.value ? "text-main bg-white" : "",
                  "hover:text-main flex h-16 w-full items-center justify-center",
                ].join(" ")}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
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
