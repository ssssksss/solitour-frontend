import Image from "next/image";
import { MdClose } from "react-icons/md";

interface Props {
  imageUrl: string;
  closeViewer: () => void;
}

const ImageViewer = ({ imageUrl, closeViewer }: Props) => {
  return (
    <div className="z-top fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="relative flex h-[calc(100%_-_48px)] w-[calc(100%_-_48px)] flex-col gap-3 rounded-2xl bg-gray-900 p-6">
        <div className="absolute right-5 top-4 cursor-pointer self-end rounded-md text-white hover:text-main dark:bg-slate-600">
          <MdClose size={"2rem"} onClick={() => closeViewer()} />
        </div>
        <div className="relative mt-8 h-full w-full">
          <Image
            src={imageUrl}
            alt="image"
            fill={true}
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
