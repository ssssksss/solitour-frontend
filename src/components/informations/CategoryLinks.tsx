import Link from "next/link";

type MyProps = {
  category: string;
};

const CategoryLinks = ({ category }: MyProps) => {
  return (
    <div className="mt-[5.5rem] flex w-[60rem] flex-row items-center justify-between border-b-[0.0625rem] max-[1024px]:w-[90%]">
      <nav className="w-fit">
        <ul className="flex flex-row items-center gap-9">
          <li>
            <Link
              className={
                `${
                  category === "맛집"
                    ? "border-b-2 border-main pb-[0.375rem] font-bold text-main"
                    : "text-gray1"
                }` +
                " " +
                "hover:main hover:font-black"
              }
              href="/informations/restaurant?subCategory=all"
            >
              맛집
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "숙박"
                    ? "border-b-2 border-main pb-[0.375rem] font-bold text-main"
                    : "text-gray1"
                }` +
                " " +
                "hover:font-black hover:text-main"
              }
              href="/informations/accommondation?subCategory=all"
            >
              숙박
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "액티비티"
                    ? "border-b-2 border-main pb-[0.375rem] font-bold text-main"
                    : "text-gray1"
                }` +
                " " +
                "hover:font-black hover:text-main"
              }
              href="/informations/activity?subCategory=all"
            >
              액티비티
            </Link>
          </li>
        </ul>
      </nav>
      <Link
        className="flex h-9 w-28 items-center justify-center rounded-full bg-main text-sm font-medium text-white hover:scale-105"
        href="/informations/write"
      >
        정보 등록하기
      </Link>
    </div>
  );
};

export default CategoryLinks;
