import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

export const SupportAboutDiary = () => {
  return (
    <div className="absolute left-0 mt-394 flex h-127 w-full items-center justify-center py-12 max-[1024px]:px-13.5 max-[744px]:px-6">
      <div className="flex h-full w-240 flex-row items-center justify-between max-[1024px]:flex-col">
        <motion.div
          className="h-65 w-109.5 max-[480px]:w-full"
          initial={{ x: "1rem", opacity: 0 }}
          whileInView={{ x: "0rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            className="flex h-full w-full items-center justify-center rounded-2xl bg-linear-to-br from-[#E0FFDF] to-[#FAEBE0] duration-300 hover:scale-105"
            href="/diary/list?page=1"
          >
            <div className="relative h-31.25 w-31.25">
              <Image
                className="object-contain"
                src="/icons/diary-icon.svg"
                alt="diary-icon"
                fill={true}
              />
            </div>
          </Link>
        </motion.div>
        <div className="flex w-98.25 flex-col gap-4.5 text-black max-[480px]:w-full">
          <motion.h2
            className="flex flex-row items-center gap-2 text-2xl font-bold"
            initial={{ x: "1rem", opacity: 0 }}
            whileInView={{ x: "0rem", opacity: 1 }}
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
            initial={{ x: "1rem", opacity: 0 }}
            whileInView={{ x: "0rem", opacity: 1 }}
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
