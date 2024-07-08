import Image from "next/image";
import QuillEditor from "./QuillEditor";

interface Props {
  content: string;
  onChange: (value: string) => void;
}

const DiaryEditor = ({ content, onChange }: Props) => {
  return (
    <div className="flex w-[60rem] flex-col max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <h1 className="text-[1.75rem] font-bold text-black dark:text-slate-200">
        일기 등록하기
      </h1>
      <p className="mt-6 text-gray1 dark:text-slate-400">
        새로운 <span className="text-main">경험을 기록</span>하고 나만의
        추억카드를 만들어보세요!
      </p>
      <div className="mt-[4.6875rem] flex h-[3.3125rem] flex-row items-center gap-7">
        <h2 className="text-lg font-semibold text-black dark:text-slate-200">
          제목<span className="text-2xl text-main">*</span>
        </h2>
        <input
          className="h-full flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm outline-none hover:border-main"
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
        />
      </div>
      <div className="mt-12 flex flex-row items-center gap-[6.75rem] max-[1024px]:flex-col max-[1024px]:items-start max-[1024px]:gap-12">
        <div className="flex flex-row items-center gap-7 max-[1024px]:items-start">
          <h2 className="text-lg font-semibold text-black dark:text-slate-200">
            날짜<span className="text-2xl text-main">*</span>
          </h2>
          <div className="flex flex-row items-center gap-[1.125rem] max-[585px]:flex-col">
            <input
              className="h-[3.3125rem] flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm outline-none hover:border-main"
              type="text"
              name="placeName"
              placeholder="YYYY.MM.DD"
            />
            <p className="text-lg font-semibold text-black">~</p>
            <input
              className="h-[3.3125rem] flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm outline-none hover:border-main"
              type="text"
              name="placeName"
              placeholder="YYYY.MM.DD"
            />
          </div>
        </div>
        <div className="flex h-[3.3125rem] flex-grow flex-row items-center gap-7 max-[1024px]:w-full">
          <h2 className="text-lg font-semibold text-black dark:text-slate-200">
            장소<span className="text-2xl text-main">*</span>
          </h2>
          <input
            className="h-full flex-grow rounded-full border-[0.0625rem] border-gray3 bg-transparent pl-5 text-sm outline-none hover:border-main"
            type="text"
            name="placeName"
            placeholder="장소명을 입력하세요."
          />
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-5 rounded-2xl border-[0.0625rem] border-gray3 p-6">
        <h2 className="text-lg font-semibold text-black dark:text-slate-200">
          하루 기분은 어땠나요?
        </h2>
        <div className="flex flex-wrap items-center gap-[2.375rem]">
          {["신나요", "좋아요", "그냥 그래요", "슬퍼요", "화나요"].map(
            (value, index) => (
              <button
                key={index + 1}
                className="flex h-[4.625rem] flex-col items-center justify-between text-[0.9375rem] text-gray1 hover:text-main"
              >
                <div className="relative h-10 w-8">
                  <Image
                    src={`/mood-icon${index + 1}.svg`}
                    alt="mood-icon"
                    fill={true}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p>{value}</p>
              </button>
            ),
          )}
        </div>
      </div>
      <QuillEditor content={content} onChange={onChange} />
      <p className="mt-3 self-end text-sm">{content.length}/1000</p>
      <button className="mb-[5.3125rem] mt-10 h-[2.625rem] w-[9.625rem] self-end rounded-full bg-main text-[0.9375rem] text-white hover:scale-105">
        일기 등록하기
      </button>
    </div>
  );
};

export default DiaryEditor;
