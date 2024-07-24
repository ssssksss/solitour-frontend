import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { MdClose } from "react-icons/md";

interface Props {
  imageUrls: string[];
  length: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  closeViewer: () => void;
}

const ImageViewer = ({
  imageUrls,
  length,
  index,
  setIndex,
  closeViewer,
}: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25 text-white">
      <div className="relative flex h-[calc(100%_-_48px)] w-[calc(100%_-_48px)] flex-col gap-3 rounded-2xl bg-gray-900 p-6">
        <div className="absolute right-5 top-4 cursor-pointer self-end rounded-md hover:text-main dark:bg-slate-600">
          <MdClose size={"2rem"} onClick={() => closeViewer()} />
        </div>
        <div className="mt-8 flex h-full w-full flex-row items-center">
          <FaCaretLeft
            className="animate-arrow cursor-pointer"
            size="2rem"
            onClick={() => setIndex((index + length - 1) % length)}
          />
          <div className="relative h-full w-full">
            <Image
              src={imageUrls[index]}
              alt="image"
              fill={true}
              style={{ objectFit: "contain" }}
            />
          </div>
          <FaCaretRight
            className="animate-arrow cursor-pointer"
            size="2rem"
            onClick={() => setIndex((index + 1) % length)}
          />
        </div>
        <p className="self-center text-lg">{`${index + 1} / ${length}`}</p>
      </div>
    </div>
  );
};

export default ImageViewer;
