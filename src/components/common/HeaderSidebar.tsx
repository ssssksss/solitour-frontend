import Link from "next/link";
import { IoIosJournal, IoMdInformationCircleOutline } from "react-icons/io";
import { IoHome, IoPeople } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";

interface Props {
  onClose: () => void;
}

const HeaderSidebar = ({ onClose }: Props) => {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-[200%] w-full animate-sidebarFadeIn flex-row justify-end bg-black/25">
      <nav className="flex h-[17.5rem] w-[9.375rem] flex-col gap-4 rounded-b-2xl bg-white p-4 dark:bg-slate-800">
        <div className="flex h-10 w-full items-center justify-end">
          <div className="cursor-pointer rounded-md bg-gray-100 p-2 hover:text-main dark:bg-slate-600">
            <MdClose onClick={onClose} />
          </div>
        </div>
        <Link
          className="flex flex-row items-center gap-2 text-sm hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-600"
          href="/"
          onClick={onClose}
        >
          <IoHome />
          <p>홈</p>
        </Link>
        <Link
          className="flex flex-row items-center gap-2 text-sm hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-600"
          href="/informations/list/restaurant?subCategory=all"
          onClick={onClose}
        >
          <IoMdInformationCircleOutline />
          <p>여행 정보</p>
        </Link>
        <Link
          className="flex flex-row items-center gap-2 text-sm hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-600"
          href="/meetings"
          onClick={onClose}
        >
          <IoPeople />
          <p>모임 정보</p>
        </Link>
        <Link
          className="flex flex-row items-center gap-2 text-sm hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-600"
          href="/diary/list"
          onClick={onClose}
        >
          <IoIosJournal />
          <p>여행일기</p>
        </Link>
        <Link
          className="flex flex-row items-center gap-2 text-sm hover:bg-gray-100 dark:text-slate-200 dark:hover:bg-slate-600"
          href="/auth/signin"
          onClick={onClose}
        >
          <RiLoginBoxLine />
          <p>로그인</p>
        </Link>
      </nav>
    </aside>
  );
};

export default HeaderSidebar;
