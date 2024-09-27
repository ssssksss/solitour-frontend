import { MdClose } from "react-icons/md";

interface Props {
  tag: string;
  borderColor?: string;
  textColor?: string;
  cursorPointer?: boolean;
  hover?: string;
  removable?: boolean;
  onClick?: () => void;
}

const ItemTag = ({
  tag,
  borderColor = "border-white",
  textColor = "text-white",
  cursorPointer,
  hover,
  removable,
  onClick,
}: Props) => {
  return (
    <div
      className={`flex flex-row text-sm items-center gap-1 text-nowrap rounded-[1rem] border-[0.0625rem] px-2 py-1 font-medium ${borderColor} ${cursorPointer ? "cursor-pointer" : ""} ${hover}`}
      onClick={onClick}
    >
      <p className={`${textColor} text-sm`}>#{tag}</p>
      {removable && (
        <MdClose className="rounded-full bg-gray-100 p-1 text-main" />
      )}
    </div>
  );
};

export default ItemTag;
