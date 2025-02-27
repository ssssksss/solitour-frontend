import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

const SupportAboutDiary = () => {
  return (
    <div className="absolute left-0 mt-[98.5rem] flex h-[31.75rem] w-full items-center justify-center py-12 max-[1024px]:px-[3.375rem] max-[744px]:px-6">
      <div className="flex h-full w-[60rem] flex-row items-center justify-between max-[1024px]:flex-col">
        <motion.div
          className="h-[16.25rem] w-[27.375rem] max-[480px]:w-full"
          initial={{ translateX: "1rem", opacity: 0 }}
          whileInView={{ translateX: "0rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#E0FFDF] to-[#FAEBE0] duration-300 hover:scale-105"
            href="/diary/list?page=1"
          >
            <div className="relative h-[7.8125rem] w-[7.8125rem]">
              <Image
                className="object-contain"
                src="/icons/diary-icon.svg"
                alt="diary-icon"
                fill={true}
              />
            </div>
          </Link>
        </motion.div>
        <div className="flex w-[24.5625rem] flex-col gap-[1.125rem] text-black max-[480px]:w-full">
          <motion.h2
            className="flex flex-row items-center gap-2 text-2xl font-bold"
            initial={{ translateX: "1rem", opacity: 0 }}
            whileInView={{ translateX: "0rem", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-6 w-6">
              <Image
                className="object-contain"
                src="/images/speech-bubble.webp"
                alt="speech-bubble"
                fill={true}
              />
              <span className="absolute z-10 flex h-6 w-6 items-center justify-center text-xs text-white">
                03
              </span>
            </div>
            일기 서비스
          </motion.h2>
          <motion.p
            className="text-sm"
            initial={{ translateX: "1rem", opacity: 0 }}
            whileInView={{ translateX: "0rem", opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            여행일기 서비스는 소중한 여행의 순간을 기록하고 나만의 여행 노트를
            만들어가는 공간입니다. 언제 어디서든 여행의 추억을 다시 느낄 수
            있도록, 여행의 모든 순간을 한곳에 모아보세요!
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default SupportAboutDiary;
