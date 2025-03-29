"use client";

import LottieImage from "@/../public/lottie/solitour_gathering_animation.json";
import Lottie from "lottie-react";
import Image from "next/image";
import Link from "next/link";

export const GatheringBanner = () => {
  return (
    <div className="absolute -mt-20 flex h-125 w-full flex-row items-center justify-center bg-gradient-to-br from-[#E7FCE0] to-[#C3E9FF] max-[744px]:h-144">
      <div className="flex h-96 w-240 flex-row items-center justify-between px-4 max-[1024px]:w-full max-[1024px]:px-13.5 max-[744px]:mt-16 max-[744px]:flex-col max-[744px]:justify-start">
        <div className="flex flex-col max-[744px]:items-center">
          {["<b>직접 내 모임</b>을", "<b>만들어</b>보세요!"].map(
            (str, index) => (
              <div
                key={index}
                className="text-2xl max-[1024px]:text-xl"
                dangerouslySetInnerHTML={{ __html: str }}
              />
            ),
          )}
          <Link
            className="mt-5 flex h-11 w-36 items-center justify-center rounded-full bg-black text-[0.9375rem] font-medium text-white shadow hover:scale-105"
            href="/gathering/write"
          >
            모임 등록하기
          </Link>
        </div>
        <div className="flex aspect-auto items-center justify-center">
          <Lottie
            className="mt-10 max-[744px]:absolute max-[744px]:top-60 max-[744px]:mt-0"
            animationData={LottieImage}
          />
          <Image
            className="absolute bottom-16 max-lg:bottom-12"
            src="/icons/gathering-people.svg"
            alt="gathering-people"
            width={423}
            height={282}
          />
        </div>
      </div>
    </div>
  );
};
