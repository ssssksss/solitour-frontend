"use client"; // Error components must be Client Components

import BackButton from "@/components/common/BackButton";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Error",
  description: "Solitour의 Error 페이지",
};

export default function Error() {
  return (
    <main className="flex w-full items-center justify-center px-6 py-20">
      <div className="flex w-full flex-col items-start justify-center">
        <div className="flex flex-col items-start justify-center gap-6">
          <h1 className="text-3xl font-bold text-black max-[744px]:text-2xl">
            앗..오류가 발생하였습니다.
          </h1>
          <div className="flex flex-col items-start text-gray1">
            <p>시스템에 오류가 발생하였습니다.</p>
            <p>잠시 후에 다시 시도해 주세요.</p>
          </div>
          <div className="flex flex-row items-center gap-[0.625rem]">
            <Link
              className="flex h-[2.625rem] w-[6.625rem] flex-row items-center justify-center rounded-full border-[0.0625rem] border-gray3 hover:scale-105"
              href="/"
            >
              홈으로
            </Link>
            <BackButton />
          </div>
        </div>
        <div className="flex w-full flex-row justify-end">
          <div className="relative h-[14.375rem] w-[18.375rem] max-[1024px]:w-[16rem] max-[744px]:w-[14rem]">
            <Image
              src="/images/error-sign.webp"
              alt="error-sign"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
