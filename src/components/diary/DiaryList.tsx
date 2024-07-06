import DiaryCard from "./DiaryCard";

const DiaryList = () => {
  return (
    <div className="w-[60rem] max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <h1 className="py-[2.375rem] text-[1.75rem] font-bold">여행 일기</h1>
      <div className="flex flex-row justify-end pb-4">
        <button className="h-[2.625rem] w-[7.6875rem] rounded-full bg-black text-white hover:scale-105">
          일기 쓰기
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {[1, 2, 3, 4].map((value) => (
          <DiaryCard key={value} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
