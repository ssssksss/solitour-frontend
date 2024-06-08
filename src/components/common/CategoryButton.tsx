type MyProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

// TODO: classname & onclick 수정 필요.
const CategoryButton = ({ children, onClick }: MyProps) => {
  return (
    <button
      className={
        `${children === "전체" ? "border-main bg-main text-white hover:text-white" : "text-gray1"}` +
        " " +
        "rounded-full border-2 border-[#E9EBED] px-3 py-1 font-semibold hover:scale-105"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
