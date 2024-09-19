"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const DiaryWriteButton = () => {
  return (
    <motion.div
      initial={{ rotateY: -90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <Link
        className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl border-[0.0625rem] border-gray3 bg-[#FBFBFB] hover:border-main max-[744px]:aspect-auto max-[744px]:h-[29rem]"
        href="/diary/write"
      >
        <Image
          src="/diary/pencil-green-icon.svg"
          alt="pencil-green-icon"
          width={44}
          height={42}
        />
        <h2 className="mt-7 text-2xl font-semibold text-black">일기 쓰기</h2>
        <p className="mt-[0.625rem] text-lg text-gray1">
          이번 여행을 기록해보세요.
        </p>
      </Link>
    </motion.div>
  );
};

export default DiaryWriteButton;
