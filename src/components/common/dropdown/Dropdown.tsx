import useOutsideClick from "@/hooks/useOutsideClick";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface IDropdown<T> {
  options: { value: T, name: string }[];
  dropdownHandler: (value: T) => void;
  defaultValue: T;
  value: T;
}

export default function Dropdown<T>({ options, dropdownHandler, defaultValue, value }: IDropdown<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T>(defaultValue);
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);
  useOutsideClick(ref, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    setSelectedOption(value);
  },[value])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: T) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative inline-block text-left ">
      <div>
        <button
          onClick={toggleDropdown}
          className="items-center gap-1 hover:text-main inline-flex justify-between w-full rounded-md px-0 py-2 text-sm font-medium text-gray-700  focus:outline-none "
        >
          {options.filter(i=>i.value == selectedOption)[0].name}
            {
              isOpen ?
              <Image src="/common/dropdown-down-arrow.svg" className="translate-y-[50%] rotate-180" alt="location-icon" width={8} height={4} /> :
              <Image src="/common/dropdown-down-arrow.svg" className="translate-y-[25%]" alt="location-icon" width={8} height={4} />
            }
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute w-full z-40 mt-2 rounded-md bg-white ring-2 ring-offset-2 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-200"
        >
          <div className={"py-1 min-w-max "} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((i) => (
              <button
                key={i.name}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
                className={`block px-2 py-2 text-sm text-gray-700  hover:text-main w-full hover:bg-white ${
                  selectedOption === i.value ? "bg-white text-main" : ""
                }`}
                role="menuitem"
              >
                {i.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
