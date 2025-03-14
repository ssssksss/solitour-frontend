"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="h-[2.625rem] w-[9.4375rem] rounded-full bg-main text-white hover:scale-105"
      type="button"
      onClick={() => router.back()}
    >
      이전 페이지로
    </button>
  );
};
