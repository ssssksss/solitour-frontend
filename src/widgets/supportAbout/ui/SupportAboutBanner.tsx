import * as motion from "motion/react-client";
import Image from "next/image";

export const SupportAboutBanner = () => {
  return (
    <motion.div
      className="bg-lightgreen absolute left-0 flex h-140 w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="animate-rotate absolute z-10 flex flex-col items-center justify-between">
        <motion.div
          className="animate-rotate-reversed absolute bottom-16.5 flex h-47.5 w-47.5 flex-col items-center justify-center gap-2 rounded-full border-2 border-[#E4E5FB] bg-white"
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
          className="animate-rotate-reversed absolute top-0 right-10.75 flex h-47.5 w-47.5 flex-col items-center justify-center gap-2.5 rounded-full border-2 border-[#D7EDFD] bg-white"
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
          className="animate-rotate-reversed absolute top-0 left-10.75 flex h-47.5 w-47.5 flex-col items-center justify-center gap-2.5 rounded-full border-2 border-[#DBF6EB] bg-white"
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
      <div className="flex h-70 w-70 items-center justify-center">
        <div className="absolute h-70 w-70">
          <Image
            className="object-contain"
            src="/images/circle.webp"
            alt="circle"
            fill={true}
          />
        </div>
        <motion.div
          className="relative h-9.5 w-27.75"
          initial={{ y: "1rem" }}
          animate={{ y: "0" }}
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
