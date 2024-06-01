type MyProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

// TODO: classname & onclick 수정 필요.
const CategoryButton = ({ children, onClick }: MyProps) => {
  return (
    <button
      className={
        `${children === "전체" ? "bg-neutral-950 text-white hover:text-white" : ""}` +
        " " +
        "rounded-full border-[1px] border-neutral-500 px-3 py-1 font-semibold text-neutral-500 hover:text-black"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
