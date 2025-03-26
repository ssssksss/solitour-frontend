"use client";

import Image from "next/image";
import Link from "next/link";
import { useHomeCarousel } from "../model/useHomeCarousel";

export const HomeCarousel = () => {
  const { currentIndex, imageList, handleClick } = useHomeCarousel();

  return (
    <div className="relative -mt-20 flex h-150 w-full items-center justify-center max-[1024px]:h-80">
      <Image
        className="-z-10 object-cover"
        src={imageList[currentIndex]}
        alt="carousel-image"
        fill={true}
      />
      <div className="relative m-auto flex h-135 w-240 flex-col items-center justify-end max-[1024px]:h-72 max-[1024px]:w-[90%]">
        <div className="absolute bottom-52 left-0 flex flex-col gap-4 max-[1024px]:bottom-16">
          <div className="text-[1.75rem] text-white max-[1024px]:text-xl">
            <h1>새로운 나를 찾는 여행,</h1>
            <h1 className="font-bold">솔리투어</h1>
          </div>
          <Link
            className="flex h-[2.6875rem] w-30 items-center justify-center rounded-3xl bg-black font-medium text-white hover:scale-105"
            href="/informations/list?page=1&parentCategoryId=1"
          >
            둘러보기
          </Link>
        </div>
        <div className="flex w-[60rem] flex-row items-center justify-center max-[1024px]:w-[90%]">
          {imageList.map((_, index) => (
            <button
              key={index}
              className={[
                index === currentIndex ? "border-b-white" : "border-b-white/50",
                "grow border-b-4",
              ].join(" ")}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
