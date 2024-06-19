import Image from "next/image";

type MyProps = {
  images: string[];
  currentIndex: number;
  onClick: (index: number) => void;
};

const HomeCarousel = ({ images, currentIndex, onClick }: MyProps) => {
  return (
    <div className="relative -mt-20 flex h-[37.5rem] w-full items-center justify-center">
      <Image
        className="-z-10"
        src={images[currentIndex]}
        alt={"/background"}
        fill={true}
        style={{
          objectFit: "cover",
        }}
      />
      <div className="relative m-auto flex h-[33.75rem] w-[60rem] flex-col items-center justify-end max-[1024px]:w-[90%]">
        <div className="absolute bottom-52 left-0 space-y-4">
          <div>
            <h1 className="text-[1.75rem] text-white">
              새로운 나를 찾는 여행,
            </h1>
            <h1 className="text-[1.75rem] font-bold text-white">솔리투어</h1>
          </div>
          <button className="h-[2.6875rem] w-[7.5rem] rounded-3xl bg-black font-medium text-white hover:scale-105">
            시작하기
          </button>
        </div>
        <div className="flex w-[60rem] flex-row items-center justify-center max-[1024px]:w-[90%]">
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
