import Image from "next/image";
import * as motion from "framer-motion/client";

const SupportAboutBanner = () => {
  return (
    <motion.div
      className="absolute left-0 flex h-[35rem] w-full items-center justify-center overflow-hidden bg-lightGreen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="absolute z-10 flex animate-rotate flex-col items-center justify-between">
        <motion.div
          className="absolute bottom-[4.125rem] flex h-[11.875rem] w-[11.875rem] animate-rotateReversed flex-col items-center justify-center gap-2 rounded-full border-2 border-[#E4E5FB] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Image
            src="/images/information.webp"
            alt="information"
            width={68}
            height={61}
          />
          <p className="text-sm font-semibold text-black">정보</p>
        </motion.div>
        <motion.div
          className="absolute right-[2.6875rem] top-0 flex h-[11.875rem] w-[11.875rem] animate-rotateReversed flex-col items-center justify-center gap-2.5 rounded-full border-2 border-[#D7EDFD] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <Image
            src="/images/gathering.webp"
            alt="gathering"
            width={62}
            height={66}
          />
          <p className="text-sm font-semibold text-black">모임</p>
        </motion.div>
        <motion.div
          className="absolute left-[2.6875rem] top-0 flex h-[11.875rem] w-[11.875rem] animate-rotateReversed flex-col items-center justify-center gap-2.5 rounded-full border-2 border-[#DBF6EB] bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <Image
            className="ml-4"
            src="/images/diary.webp"
            alt="diary"
            width={62}
            height={60}
          />
          <p className="text-sm font-semibold text-black">일기</p>
        </motion.div>
      </div>
      <div className="flex h-[17.5rem] w-[17.5rem] items-center justify-center">
        <div className="absolute h-[17.5rem] w-[17.5rem]">
          <Image
            className="object-contain"
            src="/images/circle.webp"
            alt="circle"
            fill={true}
          />
        </div>
        <motion.div
          className="relative h-[2.375rem] w-[6.9375rem]"
          initial={{ translateY: "1rem" }}
          animate={{ translateY: "0" }}
          transition={{ duration: 1 }}
        >
          <Image
            className="object-contain"
            src="/logos/solitour-logo.svg"
            alt="solitour-logo"
            fill={true}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SupportAboutBanner;
