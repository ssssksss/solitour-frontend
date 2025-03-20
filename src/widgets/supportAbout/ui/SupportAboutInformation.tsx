import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";

export const SupportAboutInformation = () => {
  return (
    <div className="absolute left-0 mt-[35rem] flex h-[31.75rem] w-full items-center justify-center py-12 max-[1024px]:px-[3.375rem] max-[744px]:px-6">
      <div className="flex h-full w-[60rem] flex-row items-center justify-between max-[1024px]:flex-col">
        <motion.div
          className="h-[16.25rem] w-[27.375rem] max-[480px]:w-full"
          initial={{ translateX: "1rem", opacity: 0 }}
          whileInView={{ translateX: "0rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link
            className="flex h-full w-full items-center justify-center rounded-2xl bg-linear-to-br from-[#CBF6FF] to-[#EBE0FA] duration-300 hover:scale-105"
            href="/informations/list?page=1&parentCategoryId=1"
          >
            <div className="relative h-[7.8125rem] w-[7.8125rem]">
              <Image
                className="object-contain"
                src="/icons/information-icon.svg"
                alt="information-icon"
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
                01
              </span>
            </div>
            정보 서비스
          </motion.h2>
          <motion.p
            className="text-sm"
            initial={{ translateX: "1rem", opacity: 0 }}
            whileInView={{ translateX: "0rem", opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            viewport={{ once: true }}
          >
            정보 서비스는 혼자 여행할 때 유용한 맛집, 숙박, 액티비티에 관한
            정보를 검색하고 등록해 여행을 쉽게 하며 사람들과 소통할 수 있습니다.
            여행지의 유용한 정보들을 함께 공유해 나의 여행 계획에 참고해보세요!
          </motion.p>
        </div>
      </div>
    </div>
  );
};
