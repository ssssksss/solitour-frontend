import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";

export const DiaryWriteLink = () => {
  return (
    <motion.div
      initial={{ rotateY: -90 }}
      whileInView={{ rotateY: 0 }}
      transition={{ duration: 0.5, ease: "linear" }}
    >
      <Link
        className="border-gray3 hover:border-main flex aspect-3/4 w-full flex-col items-center justify-center rounded-2xl border bg-[#FBFBFB] max-[744px]:aspect-auto max-[744px]:h-[29rem]"
        href="/diary/write"
      >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Image
            src="/icons/pencil-green-icon.svg"
            alt="pencil-green-icon"
            width={44}
            height={42}
          />
          <h2 className="mt-7 text-2xl font-semibold text-black">일기 쓰기</h2>
          <p className="text-gray1 mt-[0.625rem] text-lg">
            이번 여행을 기록해보세요.
          </p>
        </motion.div>
      </Link>
    </motion.div>
  );
};
