import { AnimatePresence, motion } from "motion/react";
import { Dispatch, SetStateAction } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface Props {
  imageUrls: string[];
  length: number;
  index: number;
  direction: number;
  variants: {};
  setIndex: Dispatch<SetStateAction<number[]>>;
  closeViewer: () => void;
}

const ImageViewer = ({
  imageUrls,
  length,
  index,
  direction,
  variants,
  setIndex,
  closeViewer,
}: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25 text-white">
      <div className="relative flex h-[calc(100%_-_48px)] w-[calc(100%_-_48px)] flex-col gap-3 rounded-2xl bg-gray-900 p-6">
        <div className="absolute right-5 top-4 cursor-pointer self-end rounded-md hover:text-main">
          <MdClose size={"2rem"} onClick={() => closeViewer()} />
        </div>
        <div className="mt-8 flex h-full w-full flex-row items-center">
          <FaCaretLeft
            className="animate-arrow cursor-pointer"
            size="2rem"
            onClick={() => setIndex([(index + length - 1) % length, -1])}
          />
          <div className="relative h-full w-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                className="absolute left-0 h-full w-full object-contain"
                key={index}
                src={imageUrls[index]}
                alt="image"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    setIndex([(index + 1) % length, 1]);
                  } else if (swipe > 10000) {
                    setIndex([(index + length - 1) % length, -1]);
                  }
                }}
              />
            </AnimatePresence>
          </div>
          <FaCaretRight
            className="animate-arrow cursor-pointer"
            size="2rem"
            onClick={() => setIndex([(index + 1) % length, 1])}
          />
        </div>
        <p className="self-center text-lg">{`${index + 1} / ${length}`}</p>
      </div>
    </div>
  );
};

export default ImageViewer;
