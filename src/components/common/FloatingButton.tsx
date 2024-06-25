import Link from "next/link";
import { IoIosArrowUp } from "react-icons/io";
import { MdAdd, MdClose } from "react-icons/md";

type MyProps = {
  visible: boolean;
  onClick: () => void;
  onScrollToTop: () => void;
};

const FloatingButton = ({ visible, onClick, onScrollToTop }: MyProps) => {
  return (
    <div className="fixed bottom-8 right-0 flex w-24 flex-col items-center gap-6">
      {visible && (
        <div className="animate-bgFadeIn -mb-4 flex flex-col items-center gap-6 rounded-full bg-[#F2FAF7] px-4 pb-4 pt-[1.875rem]">
          <Link
            className="animate-fadeIn flex flex-col items-center text-sm hover:text-main"
            href="/meetings/write"
          >
            <p>모임</p>
            <p>등록하기</p>
          </Link>
          <Link
            className="animate-fadeIn flex flex-col items-center text-sm hover:text-main"
            href="/informations/write"
          >
            <p>여행정보</p>
            <p>등록하기</p>
          </Link>
          <button
            className="animate-buttonRotation flex h-12 w-12 flex-row items-center justify-center rounded-full bg-main text-white shadow-md hover:scale-105"
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
          <MdAdd size={"1.5rem"} />
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
};

export default FloatingButton;
