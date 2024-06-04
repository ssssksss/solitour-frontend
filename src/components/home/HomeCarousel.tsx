import Image from "next/image";

// TODO: 이미지 개수만큼 설정
const HomeCarousel = () => {
  // todo
  const images = [
    "/background.svg",
    "/background.svg",
    "/background.svg",
    "/background.svg",
  ];

  return (
    <div className="relative -mt-20 flex h-[600px] w-full items-center justify-center">
      <Image
        className="-z-10"
        src={"/background.svg"}
        alt={"/background"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="relative m-auto flex h-[540px] w-[960px] flex-col items-center justify-end">
        <div className="absolute bottom-52 left-0 space-y-4">
          <div>
            <h1 className="text-[28px] text-white">새로운 나를 찾는 여행,</h1>
            <h1 className="text-[28px] font-bold text-white">솔리투어</h1>
          </div>

          <button className="h-[43px] w-[120px] rounded-3xl bg-black text-white">
            시작하기
          </button>
        </div>
        <div className="flex flex-row items-center justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              className={
                "w-60" +
                ` ${index === 0 ? "border-b-4 border-b-white" : "border-b-2 border-b-white/50"}`
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
