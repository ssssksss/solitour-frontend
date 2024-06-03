import Link from "next/link";
import { MdClose } from "react-icons/md";

type MyProps = {
  onClose: () => void;
};

// TODO
const HeaderSidebar = ({ onClose }: MyProps) => {
  return (
    <aside className="animate-sidebar fixed left-0 top-0 z-50 flex h-full w-[200%]">
      <nav className="h-full w-[200px] bg-white p-4">
        <div className="hover:text-main mb-6 flex h-10 w-10 cursor-pointer items-center justify-center bg-white">
          <MdClose size={"3rem"} onClick={onClose} />
        </div>
        <ul className="space-y-8">
          <li className="shadow-main rounded-2xl p-4 shadow">
            <Link
              className="hover:text-main text-xl"
              href="/"
              onClick={onClose}
            >
              홈
            </Link>
            <div className="flex flex-col space-y-2 pl-4 pt-4">
              <Link className="hover:text-main" href="/login" onClick={onClose}>
                로그인
              </Link>
              <Link
                className="hover:text-main"
                href="/register"
                onClick={onClose}
              >
                회원가입
              </Link>
            </div>
          </li>
          <li className="shadow-main rounded-2xl p-4 shadow">
            <Link
              className="hover:text-main text-xl"
              href="/informations/restaurant"
              onClick={onClose}
            >
              정보
            </Link>
            <div className="flex flex-col space-y-2 pl-4 pt-4">
              <Link
                className="hover:text-main"
                href="/informations/restaurant"
                onClick={onClose}
              >
                맛집
              </Link>
              <Link
                className="hover:text-main"
                href="/informations/accommondation"
                onClick={onClose}
              >
                숙박
              </Link>
              <Link
                className="hover:text-main"
                href="/informations/activity"
                onClick={onClose}
              >
                액티비티
              </Link>
            </div>
          </li>
          <li className="shadow-main rounded-2xl p-4 shadow">
            <Link
              className="hover:text-main text-xl"
              href="/meetings"
              onClick={onClose}
            >
              모임
            </Link>
            <div className="flex flex-col space-y-2 pl-4 pt-4">
              <Link className="hover:text-main" href="/" onClick={onClose}>
                모임 목록
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div className="h-full w-full bg-black/25" onClick={onClose} />
    </aside>
  );
};

export default HeaderSidebar;
