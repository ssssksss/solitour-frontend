interface MyPageCategoryListProps {
  categoryList: {
    name: string;
    value: string;
  }[];
  activeCategory: string;
  onClick: (value: string) => void;
}

export const MyPageCategoryList = ({
  categoryList,
  activeCategory,
  onClick,
}: MyPageCategoryListProps) => {
  return (
    <div className="w-full gap-8 pt-8">
      <div className="flex gap-1.5">
        {categoryList.map((category) => (
          <button
            key={category.name}
            className={[
              `${
                category.value === activeCategory
                  ? "bg-main text-white outline-0"
                  : "text-gray1 bg-white outline -outline-offset-1 outline-[#E9EBED]"
              }`,
              "h-9 rounded-full px-4 py-2 text-sm",
            ].join(" ")}
            onClick={() => onClick(category.value)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
