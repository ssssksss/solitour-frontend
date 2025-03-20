import Image from "next/image";
import Link from "next/link";
import * as motion from "motion/react-client";

export const InformationBanner = () => {
  return (
    <div className="absolute -mt-20 flex h-[31.25rem] w-full flex-row items-center justify-center bg-gradient-to-br from-[#CBF6FF] to-[#EBE0FA] max-[744px]:h-[36rem]">
      <div className="flex h-96 w-[60rem] flex-row items-center justify-between px-4 max-[1024px]:w-full max-[1024px]:px-[3.375rem] max-[744px]:flex-col max-[744px]:justify-center">
        <div className="flex flex-col max-[744px]:items-center">
          {["유용한 <b>여행 정보</b>를", "<b>공유</b>해보세요!"].map(
            (str, index) => (
              <div
                className="text-2xl max-[1024px]:text-xl"
                key={index}
                dangerouslySetInnerHTML={{ __html: str }}
              />
            ),
          )}
          <Link
            className="mt-5 flex h-11 w-[9rem] items-center justify-center rounded-full bg-black text-[0.9375rem] font-medium text-white shadow hover:scale-105"
            href="/informations/write"
          >
            정보 등록하기
          </Link>
        </div>
        <motion.div
          className="relative flex h-[13.5rem] w-[24.875rem] items-center justify-end max-[1024px]:mt-8 max-[1024px]:h-[10.6875rem] max-[744px]:justify-center"
          animate={{ y: ["-1rem", "0.75rem", "-1rem"] }}
          transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
        >
          <Image
            className="object-contain"
            src="/images/information-chat.webp"
            alt="information-chat"
            fill={true}
          />
        </motion.div>
      </div>
    </div>
  );
};
