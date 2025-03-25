"use client";

import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="bg-main h-10.5 w-[9.4375rem] rounded-full text-white hover:scale-105"
      type="button"
      onClick={() => router.back()}
    >
      이전 페이지로
    </button>
  );
};
