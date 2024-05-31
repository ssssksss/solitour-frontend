type MyProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const CategoryButton = ({ children, onClick }: MyProps) => {
  return (
    <button
      className="rounded-full border-[1px] border-neutral-400 bg-white px-3 py-1 font-black text-neutral-400"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CategoryButton;
