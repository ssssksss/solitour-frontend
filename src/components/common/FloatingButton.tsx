import { IoIosArrowUp } from "react-icons/io";

const FloatingButton = ({ onClick }: Readonly<{ onClick: () => void }>) => {
  return (
    <div className="fixed bottom-8 right-8">
      <button
        className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105"
        onClick={onClick}
      >
        <IoIosArrowUp size={"2rem"} />
      </button>
    </div>
  );
};

export default FloatingButton;
