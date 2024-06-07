import Link from "next/link";

type MyProps = {
  category: string;
};

const CategoryLinks = ({ category }: MyProps) => {
  return (
    <div className="mt-[5.5rem] w-[60rem] max-[1024px]:w-[90%]">
      <nav className="w-[60rem] bg-white max-[1024px]:w-full">
        <ul className="flex flex-row space-x-10 pb-2">
          <li>
            <Link
              className={
                `${
                  category === "맛집"
                    ? "border-b-2 border-main pb-2 font-black text-main"
                    : "text-gray-500"
                }` +
                " " +
                "hover:main hover:font-black"
              }
              href="/informations/restaurant"
            >
              맛집
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "숙박"
                    ? "border-b-2 border-main pb-2 font-black text-main"
                    : "text-gray-500"
                }` +
                " " +
                "hover:font-black hover:text-main"
              }
              href="/informations/accommondation"
            >
              숙박
            </Link>
          </li>
          <li>
            <Link
              className={
                `${
                  category === "액티비티"
                    ? "border-b-2 border-main pb-2 font-black text-main"
                    : "text-gray-500"
                }` +
                " " +
                "hover:font-black hover:text-main"
              }
              href="/informations/activity"
            >
              액티비티
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default CategoryLinks;
