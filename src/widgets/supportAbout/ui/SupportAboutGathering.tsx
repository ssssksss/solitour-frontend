import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

export const SupportAboutGathering = () => {
  return (
    <motion.div
      className="absolute left-0 mt-267 flex h-127 w-full items-center justify-center bg-[#F9FAFB] py-12 max-[1024px]:px-13.5 max-[744px]:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      viewport={{ amount: 0.5, once: true }}
    >
      <div className="flex h-full w-240 flex-row items-center justify-between max-[1024px]:flex-col-reverse">
        <div className="flex w-98.25 flex-col gap-4.5 text-black max-[480px]:w-full">
          <motion.h2
            className="flex flex-row items-center gap-2 text-2xl font-bold"
            initial={{ x: "-1rem", opacity: 0 }}
            whileInView={{ x: "0rem", opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            viewport={{ amount: 0.5, once: true }}
          >
            <div className="relative h-6 w-6">
              <Image
                className="object-contain"
                src="/images/speech-bubble.webp"
                alt="speech-bubble"
                fill={true}
              />
              <span className="absolute z-10 flex h-6 w-6 items-center justify-center text-xs text-white">
                02
              </span>
            </div>
            모임 서비스
          </motion.h2>
          <motion.p
            className="text-sm"
            initial={{ x: "-1rem", opacity: 0 }}
            whileInView={{ x: "0rem", opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            모임 서비스는 같은 취미 및 활동을 기반으로 모임을 만들고 참여할 수
            있는 서비스를 제공합니다. 솔리투어 모임에서 새로운 사람들과 새로운
            경험을 해보세요!
          </motion.p>
        </div>
        <motion.div
          className="h-65 w-109.5 max-[480px]:w-full"
          initial={{ x: "-1rem", opacity: 0 }}
          whileInView={{ x: "0rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            className="flex h-full w-full items-center justify-center rounded-2xl bg-linear-to-br from-[#E7FCE0] to-[#C3E9FF] duration-300 hover:scale-105"
            href="/gathering"
          >
            <div className="relative h-31.25 w-31.25">
              <Image
                className="object-contain"
                src="/icons/gathering-icon.svg"
                alt="gathering-icon"
                fill={true}
              />
            </div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};
