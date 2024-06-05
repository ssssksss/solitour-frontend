import Image from "next/image";

type MyProps = {
  images: string[];
  currentIndex: number;
  onClick: (index: number) => void;
};

const HomeCarousel = ({ images, currentIndex, onClick }: MyProps) => {
  return (
    <div className="relative -mt-20 flex h-[600px] w-full items-center justify-center">
      <Image
        className="-z-10"
        src={images[currentIndex]}
        alt={"/background"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="relative m-auto flex h-[540px] w-[960px] flex-col items-center justify-end max-[1024px]:w-[90%]">
        <div className="absolute bottom-52 left-0 space-y-4">
          <div>
            <h1 className="text-[28px] text-white">새로운 나를 찾는 여행,</h1>
            <h1 className="text-[28px] font-bold text-white">솔리투어</h1>
          </div>
          <button className="h-[43px] w-[120px] rounded-3xl bg-black text-white">
            시작하기
          </button>
        </div>
        <div className="flex w-[960px] flex-row items-center justify-center max-[1024px]:w-[90%]">
          {images.map((image, index) => (
            <button
              key={index}
              className={
                "flex-grow border-b-4" +
                ` ${index === currentIndex ? "border-b-white" : "border-b-white/50"}`
              }
              onClick={(e) => onClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
