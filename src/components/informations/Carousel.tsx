import Link from "next/link";

type MyProps = {
  pathname: string;
  onClick: () => void;
};

// todo
const Carousel = ({ pathname, onClick }: MyProps) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[1440px] pl-[240px] py-10 font-black text-3xl">
        정보
      </div>
      <nav className="w-[1440px] bg-white pl-[240px]">
        <ul className="flex flex-row space-x-10 pb-2">
          <li>
            <Link
              className={`${
                pathname.includes("restaurant")
                  ? "font-black text-black border-b-2 border-black pb-2"
                  : "text-gray-500"
              }`}
              href="/informations/restaurant"
            >
              맛집
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname.includes("accommondation")
                  ? "font-black text-black border-b-2 border-black pb-2"
                  : "text-gray-500"
              }`}
              href="/informations/accommondation"
            >
              숙박
            </Link>
          </li>
          <li>
            <Link
              className={`${
                pathname.includes("activity")
                  ? "font-black text-black border-b-2 border-black pb-2"
                  : "text-gray-500"
              }`}
              href="/informations/activity"
            >
              액티비티
            </Link>
          </li>
        </ul>
      </nav>
      <div className="w-full bg-neutral-100 flex flex-row justify-center">
        <div className="w-[1440px] h-96 px-[240px]">
          <div className="flex flex-row justify-between items-center pt-20">
            <div>
              <div className="font-black text-2xl">
                <p>유용한 맛집 정보를</p>
                <p>등록해보세요!</p>
              </div>
              <button
                className="bg-white rounded-full px-8 py-4 text-gray-500 font-black mt-6 hover:text-black"
                onClick={onClick}
              >
                맛집 등록하기
              </button>
            </div>
            <div className="w-[468px] h-48 bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
