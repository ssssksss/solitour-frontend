import { BackButton } from "@/shared/ui/button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not Found",
  description: "Solitour의 Not found 페이지",
};

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 py-20">
      <div className="relative aspect-75/46 w-93.75 max-[744px]:w-80">
        <Image
          className="object-contain"
          src="/logos/404-logo.svg"
          alt="404-logo"
          fill={true}
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-x-3 text-3xl font-bold text-black max-[744px]:flex-col">
        <p>앗..요청하신 페이지를</p>
        <p>찾을 수 없습니다.</p>
      </div>
      <div className="text-gray1 flex flex-col items-center">
        <p>존재하지 않는 주소를 입력하셨거나,</p>
        <div className="flex flex-row flex-wrap items-center justify-center gap-x-1 max-[480px]:flex-col">
          <p>{"요청하신 페이지의 주소가 변경, "}</p>
          <p>{"삭제되어 찾을 수 없습니다."}</p>
        </div>
      </div>
      <div className="flex flex-row items-center gap-2.5">
        <Link
          className="border-gray3 flex h-10.5 w-26.5 flex-row items-center justify-center rounded-full border hover:scale-105"
          href="/"
        >
          홈으로
        </Link>
        <BackButton />
      </div>
    </main>
  );
}
