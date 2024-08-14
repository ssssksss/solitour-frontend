import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface IDropdown<T> {
  options: { value: T, name: string }[];
  dropdownHandler: (value: T) => void;
  defaultValue: T;
}

export default function Dropdown<T>({ options, dropdownHandler, defaultValue }: IDropdown<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<T>(defaultValue);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: T) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          onClick={toggleDropdown}
          className="items-center hover:text-main inline-flex justify-between w-full rounded-md px-0 py-2 bg-white text-sm font-medium text-gray-700  focus:outline-none "
        >
          {options.map((i)=>i.name)[0]}
          <IoIosArrowDown />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-[6rem] rounded-md bg-white ring-2 ring-offset-2 ring-black ring-opacity-5 focus:outline-none transition ease-out duration-200"
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {options.map((i) => (
              <button
                key={i.name}
                onClick={() => {
                  dropdownHandler(i.value);
                  handleOptionClick(i.value);
                }}
                className={`block px-4 py-2 text-sm text-gray-700  hover:text-main w-full hover:bg-white ${
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
