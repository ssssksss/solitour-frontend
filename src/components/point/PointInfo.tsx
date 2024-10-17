const PointInfo = () => {
  return (
    <div className="w-full">
      <h1 className="pt-[2.375rem] text-[1.75rem] font-bold text-black">
        포인트
      </h1>
      <div className="mt-6 flex h-[7.875rem] w-full flex-row items-center justify-between rounded-xl border border-[#e3e3e3] px-10 pb-10 pt-[1.875rem]">
        <h2 className="text-xl font-semibold text-black">
          하몽 님의<p>사용 가능 포인트</p>
        </h2>
        <p className="text-2xl font-bold text-main">+ 200P</p>
      </div>
    </div>
  );
};

export default PointInfo;
