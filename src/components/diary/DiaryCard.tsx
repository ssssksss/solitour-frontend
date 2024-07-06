import Image from "next/image";

const DiaryCard = () => {
  return (
    <div className="relative h-[38.9375rem] w-[29.375rem] rounded-2xl border-[0.0625rem] border-gray3 hover:border-main">
      <Image
        className="-z-10"
        src="/diary-image1.svg"
        alt="diary-image"
        fill={true}
        style={{ objectFit: "cover" }}
      />
      <div className="absolute bottom-9 left-9 flex flex-col gap-1 text-white">
        <h2 className="text-2xl font-bold">나 홀로 제주여행</h2>
        <p className="text-lg">2024.06.07-2024.06.10</p>
      </div>
    </div>
  );
};

export default DiaryCard;
