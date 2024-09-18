import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { MdClose } from "react-icons/md";

interface Props {
  visible: boolean;
  animationFlag: boolean;
  onClick: () => void;
  onScrollToTop: () => void;
}

const FloatingButton = forwardRef<HTMLDivElement, Props>(
  ({ visible, animationFlag, onClick, onScrollToTop }, ref) => {
    return (
      <div className="fixed bottom-8 left-[calc(100vw-12px)] z-40 flex w-24 translate-x-[-100%] flex-col items-center gap-3">
        {visible && (
          <div ref={ref} className="flex flex-col items-center gap-3">
            <div
              className={`${animationFlag ? "animate-fadeOut" : "animate-fadeIn"} flex flex-col items-center gap-6 rounded-full bg-[#F2FAF7] px-4 py-[1.875rem]`}
            >
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
                href="/gathering/write"
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
              className={`${animationFlag ? "animate-buttonReverseRotation" : "animate-buttonRotation"} flex h-12 w-12 flex-row items-center justify-center rounded-full bg-main text-white shadow-md hover:scale-105`}
              onClick={onClick}
            >
              <MdClose size={"1.5rem"} />
            </button>
          </div>
        )}
        {!visible && (
          <button
            className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105"
            onClick={onClick}
          >
            <Image
              className="-ml-1"
              src="/common/pencil-icon.png"
              alt="pencil-icon"
              width={24}
              height={24}
            />
          </button>
        )}
        <button
          className="flex h-12 w-12 flex-row items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105"
          onClick={onScrollToTop}
        >
          <IoIosArrowUp size={"1.5rem"} />
        </button>
      </div>
    );
  },
);

FloatingButton.displayName = "FloatingButton";

export default FloatingButton;
