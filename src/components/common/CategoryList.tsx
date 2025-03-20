interface CategoryListProps<T> {
  categories: {
    name: string;
    value: T;
  }[];
  activeCategory: T;
  onClick: (value: T) => void;
}

const CategoryList = <T extends string | number>({
  categories,
  activeCategory,
  onClick,
}: CategoryListProps<T>) => {
  const onClickMenu = (value: T) => {
    onClick(value);
  };

  return (
    <div className="w-full gap-[2rem] pt-[2rem]">
      <div className={"flex gap-[0.375rem]"}>
        {categories.map((i) => (
          <button
            key={i.value.toString()} // key는 문자열로 변환하여 유니크하게 설정
            onClick={() => onClickMenu(i.value)}
            className={`h-[2.25rem] rounded-[4rem] px-4 py-2 text-sm ${
              i.value == activeCategory
                ? "bg-main text-white outline-0"
                : "text-gray1 bg-white outline outline-offset-[-0.0625rem] outline-[#E9EBED]"
            } `}
          >
            {i.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
