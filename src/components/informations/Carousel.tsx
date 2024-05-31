import Link from "next/link";

type MyProps = {
  pathname: string;
  onClick: () => void;
};

// todo
const Carousel = ({ pathname, onClick }: MyProps) => {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-[1440px] py-10 pl-[240px] text-3xl font-black">
        정보
      </div>
      <nav className="w-[1440px] bg-white pl-[240px]">
        <ul className="flex flex-row space-x-10 pb-2">
          <li>
            <Link
              className={
                `${
                  pathname.includes("restaurant")
                    ? "border-b-2 border-black pb-2 font-black text-black"
                    : "text-gray-500"
                }` + "hover:font-black hover:text-black"
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
                  pathname.includes("accommondation")
                    ? "border-b-2 border-black pb-2 font-black text-black"
                    : "text-gray-500"
                }` + "hover:font-black hover:text-black"
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
                  pathname.includes("activity")
                    ? "border-b-2 border-black pb-2 font-black text-black"
                    : "text-gray-500"
                }` + "hover:font-black hover:text-black"
              }
              href="/informations/activity"
            >
              액티비티
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex w-full flex-row justify-center bg-neutral-100">
        <div className="h-96 w-[1440px] px-[240px]">
          <div className="flex flex-row items-center justify-between pt-20">
            <div>
              <div className="text-2xl font-black">
                <p>유용한 맛집 정보를</p>
                <p>등록해보세요!</p>
              </div>
              <button
                className="mt-6 rounded-full bg-white px-8 py-4 font-black text-gray-500 shadow hover:text-black"
                onClick={onClick}
              >
                맛집 등록하기
              </button>
            </div>
            <div className="h-48 w-[468px] bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
