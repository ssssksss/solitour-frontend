import Image from "next/image";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { TiLocation } from "react-icons/ti";

interface Props {
  id: number;
}

const DiaryViewer = ({ id }: Props) => {
  return (
    <div className="flex w-[60rem] flex-col items-start max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex flex-row items-center gap-14">
        <Image src="/day-text.svg" alt="day-text" width={41} height={25} />
        {[1, 2, 3, 4, 5, 6, 7].map((value) => (
          <Link
            key={value}
            className={`${value === 1 ? "text-main" : "text-gray2"} font-semibold hover:text-main`}
            href={`/diary/${id}?day=${value}`}
          >
            {value}
          </Link>
        ))}
      </div>
      <div className="relative mt-[5.5rem] h-20 w-16">
        <Image
          src="/mood-icon2.svg"
          alt="mood-icon"
          fill={true}
          style={{ objectFit: "contain" }}
        />
      </div>
      <h1 className="mt-12 text-[1.75rem] font-bold">나 홀로 제주여행</h1>
      <div className="mt-6 flex w-full flex-row items-center justify-between text-lg">
        <p>2024.06.07</p>
        <div className="flex flex-row items-center gap-1">
          <TiLocation className="text-main" size={"1.1rem"} />
          <p className="font-medium text-gray1 dark:text-slate-400">
            제주특별자치도, 제주도
          </p>
        </div>
      </div>
      <div className="mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
        <button className="flex flex-row items-center gap-1 hover:text-main dark:text-slate-400">
          <GoPencil />
          수정
        </button>
        <button className="flex flex-row items-center gap-1 hover:text-main dark:text-slate-400">
          <FaRegTrashCan />
          삭제
        </button>
      </div>
    </div>
  );
};

export default DiaryViewer;
