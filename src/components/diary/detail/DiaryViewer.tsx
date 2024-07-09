import Image from "next/image";
import Link from "next/link";
import { FaRegTrashCan } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { TiLocation } from "react-icons/ti";

interface Props {
  id: number;
}

const DiaryViewer = async ({ id }: Props) => {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="flex w-[60rem] flex-col items-start max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <div className="flex w-full flex-row items-center gap-14 overflow-x-auto">
        <Image
          className="hidden dark:block"
          src="/day-text-dark-mode.svg"
          alt="day-text"
          width={41}
          height={25}
        />
        <Image
          className="dark:hidden"
          src="/day-text.svg"
          alt="day-text"
          width={41}
          height={25}
        />
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
      <h1 className="mt-12 text-[1.75rem] font-bold dark:text-slate-200">
        나 홀로 제주여행
      </h1>
      <div className="mt-6 flex w-full flex-row items-center justify-between text-lg text-gray1 dark:text-slate-400">
        <p>2024.06.07</p>
        <div className="flex flex-row items-center gap-1">
          <TiLocation className="text-main" size={"1.3rem"} />
          <p>제주특별자치도, 제주도</p>
        </div>
      </div>
      <div className="mt-16 flex w-full flex-col dark:text-slate-400">
        <p>7월 나 홀로 3박 4일 제주도 여행을 다녀왔다.</p>
        <p>
          제주도는 언제가도 너무 좋아 자주 와봤는데 혼자 여행은 처음이라 많은
          것을 느낀 여행이였다.
        </p>
        <div className="relative my-[2.375rem] aspect-[9/4] w-full">
          <Image
            className="rounded-2xl dark:opacity-65"
            src="/example/diary/detail/diary-image1.svg"
            alt="diary-image"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
        <p>
          해안도로 에서 자전거를 탔을 때가 가장 기억이 많이 난다. 날씨도 너무
          좋고 바다도 예뻐 혼자 2시간을 목적지 없이 자전거를 탔다. 새삼 체력이
          좋아진 듯하다!
        </p>
        <div className="my-[2.375rem] flex flex-row items-center gap-5 max-[1024px]:flex-col">
          <div className="relative h-[26.1875rem] w-[29.375rem] rounded-2xl max-[518px]:w-full">
            <Image
              className="rounded-2xl dark:opacity-65"
              src="/example/diary/detail/diary-image2.svg"
              alt="diary-image"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="relative h-[26.1875rem] w-[29.375rem] rounded-2xl max-[518px]:w-full">
            <Image
              className="rounded-2xl dark:opacity-65"
              src="/example/diary/detail/diary-image3.svg"
              alt="diary-image"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <p>
          그리고 솔리투어에서 추천해준 오셜록 티뮤지엄에 갔는데 생각보다 볼 것도
          많고 가보길 잘한...
        </p>
      </div>
      <div className="mb-32 mt-6 flex w-full flex-row items-center justify-end gap-3 text-sm">
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
