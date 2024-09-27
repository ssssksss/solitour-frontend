
type T = string | number;

interface ICategoryList<T> {
  categories: {
    name: string;
    value: T;
  }[];
  onClickHandler: (value: T) => void;
  activeCategory: T;
}

const CategoryList = <T extends string | number>({
  categories,
  onClickHandler,
  activeCategory
}: ICategoryList<T>) => {
  const onClickMenu = (value: T) => {
    onClickHandler(value);
  };

  return (
    <div className="gap-[2rem] pt-[2rem] w-full">
      <div className={"flex gap-[0.375rem]"}>
        {categories.map((i) => (
          <button
            key={i.value.toString()} // key는 문자열로 변환하여 유니크하게 설정
            onClick={() => onClickMenu(i.value)}
            className={`h-[2.25rem] rounded-[4rem] px-4 py-2 text-sm  ${
              i.value == activeCategory
                ? "bg-main text-white outline-0"
                : "bg-white text-gray1 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-[#E9EBED]"
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
