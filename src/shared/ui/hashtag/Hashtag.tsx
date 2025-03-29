import { MdClose } from "react-icons/md";

interface HashtagProps {
  tagName: string;
  borderColor?: string;
  textColor?: string;
  cursorPointer?: boolean;
  hover?: string;
  removable?: boolean;
  onClick?: () => void;
}

export const Hashtag = ({
  tagName,
  borderColor = "border-white",
  textColor = "text-white",
  cursorPointer,
  hover,
  removable,
  onClick,
}: HashtagProps) => {
  return (
    <div
      className={[
        borderColor,
        cursorPointer ? "cursor-pointer" : "",
        hover,
        "flex flex-row items-center gap-1 rounded-2xl border px-2 py-1 text-sm font-medium text-nowrap",
      ].join(" ")}
      onClick={onClick}
    >
      <p className={[textColor, "text-sm"].join(" ")}>#{tagName}</p>
      {removable && (
        <MdClose className="text-main rounded-full bg-gray-100 p-1" />
      )}
    </div>
  );
};
