import Image from "next/image";

const PointHistoryItem = () => {
  return (
    <div className="flex h-[6.375rem] w-full flex-row items-center justify-between border-b py-[1.875rem]">
      <div className="flex flex-row gap-1.5">
        <div className="relative h-5 w-5">
          <Image
            className="object-contain"
            src="/point/point-icon.png"
            alt="point"
            fill={true}
          />
        </div>
        <div>
          <p className="font-medium text-black">정보 등록</p>
          <p className="text-sm text-gray1">
            {new Date().toLocaleDateString("ko-KR")}
          </p>
        </div>
      </div>
      <p className="text-lg font-semibold text-black">+ 100P 적립</p>
    </div>
  );
};

export default PointHistoryItem;
