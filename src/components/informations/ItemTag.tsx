type MyProps = {
  tag: string;
  borderColor?: string;
  textColor?: string;
  cursorPointer?: boolean;
  hover?: string;
  onClick?: () => void;
};

const ItemTag = ({
  tag,
  borderColor = "border-white",
  textColor = "text-white",
  cursorPointer,
  hover,
  onClick,
}: MyProps) => {
  return (
    <div
      className={`rounded-full border-[0.0625rem] ${borderColor} ${cursorPointer ? "cursor-pointer" : ""} ${hover}`}
      onClick={onClick}
    >
      <p className={`px-2 py-1 text-xs font-medium ${textColor}`}>#{tag}</p>
    </div>
  );
};

export default ItemTag;
