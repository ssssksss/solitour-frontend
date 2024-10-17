import Link from "next/link";

const PointCategoryList = () => {
  return (
    <div className="mt-[3.625rem] flex w-full flex-col gap-8">
      <nav className="w-full">
        <ul className="flex w-full flex-row items-center">
          <li className="w-full border-b-2 border-b-main pb-1 text-center font-bold text-main">
            <Link href="/point">포인트 조회</Link>
          </li>
          <li className="w-full border-b pb-1 text-center hover:text-main">
            <Link href="/point/shop">포인트 사용</Link>
          </li>
        </ul>
      </nav>
      <div className="flex flex-row items-center gap-1">
        <button className="h-[2.0625rem] w-[3.5625rem] rounded-full border border-main bg-main text-sm text-white hover:scale-105">
          전체
        </button>
        <button className="h-[2.0625rem] w-[3.5625rem] rounded-full border border-[#E9EBED] text-sm text-gray1 hover:scale-105">
          적립
        </button>
        <button className="h-[2.0625rem] w-[3.5625rem] rounded-full border border-[#E9EBED] text-sm text-gray1 hover:scale-105">
          사용
        </button>
        <button className="h-[2.0625rem] w-[3.5625rem] rounded-full border border-[#E9EBED] text-sm text-gray1 hover:scale-105">
          소멸
        </button>
      </div>
    </div>
  );
};

export default PointCategoryList;
