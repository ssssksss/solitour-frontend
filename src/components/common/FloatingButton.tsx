import Image from "next/image";
import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { MdClose } from "react-icons/md";

type MyProps = {
  visible: boolean;
  onClick: () => void;
  onScrollToTop: () => void;
};

const FloatingButton = ({ visible, onClick, onScrollToTop }: MyProps) => {
  return (
    <div className="fixed bottom-8 right-0 z-40 flex w-24 flex-col items-center gap-3">
      {visible && (
        <div className="flex flex-col items-center gap-3">
          <div className="flex animate-fadeIn flex-col items-center gap-6 rounded-full bg-[#F2FAF7] px-4 py-[1.875rem] dark:bg-slate-500">
            <Link
              className="flex flex-col items-center text-sm hover:text-main"
              href="/diary/write"
              onClick={onClick}
            >
              <p>일기</p>
              <p>등록하기</p>
            </Link>
            <Link
              className="flex flex-col items-center text-sm hover:text-main"
              href="/meetings/write"
              onClick={onClick}
            >
              <p>모임</p>
              <p>등록하기</p>
            </Link>
            <Link
              className="flex flex-col items-center text-sm hover:text-main"
              href="/informations/write"
              onClick={onClick}
            >
              <p>여행정보</p>
              <p>등록하기</p>
            </Link>
          </div>
          <button
            className="flex h-12 w-12 animate-buttonRotation flex-row items-center justify-center rounded-full bg-main text-white shadow-md hover:scale-105"
            onClick={onClick}
          >
            <MdClose size={"1.5rem"} />
          </button>
        </div>
      )}
      {!visible && (
        <button
          className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105 dark:bg-slate-600"
          onClick={onClick}
        >
          <Image
            className="-ml-1"
            src="/pencil-icon.png"
            alt="pencil-icon"
            width={24}
            height={24}
          />
        </button>
      )}
      <button
        className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105 dark:bg-slate-600"
        onClick={onScrollToTop}
      >
        <IoIosArrowUp size={"1.5rem"} />
      </button>
    </div>
  );
};

export default FloatingButton;
