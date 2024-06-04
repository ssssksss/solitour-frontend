import Link from "next/link";
import HeaderSidebar from "../common/HeaderSidebar";
import { MdOutlineMenu } from "react-icons/md";

type MyProps = {
  pathname: string;
  visible: boolean;
  onMenuClicked: () => void;
  onClose: () => void;
};

const HomeHeader = ({ pathname, visible, onMenuClicked, onClose }: MyProps) => {
  return (
    <header className="relative flex w-full flex-row justify-center">
      {visible && <HeaderSidebar onClose={onClose} />}
      <div className="z-10 flex w-full justify-center shadow">
        <div className="flex h-20 w-[1440px] flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div
              className="hidden cursor-pointer pl-4 max-[1024px]:flex"
              onClick={onMenuClicked}
            >
              <MdOutlineMenu size="2rem" onClick={onMenuClicked} />
            </div>
            <Link className="pl-[38px] font-black max-[1024px]:pl-4" href="/">
              Solitour
            </Link>
          </div>
          <div className="flex flex-grow flex-row justify-between px-36 max-[1024px]:hidden">
            <nav>
              <ul className="font flex flex-row space-x-10">
                <li>
                  <Link
                    className={
                      `${pathname === "/" ? "font-black text-black" : " "}` +
                      "hover:font-black hover:text-black"
                    }
                    href="/"
                  >
                    홈
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      `${
                        pathname.includes("/informations")
                          ? "font-black text-black"
                          : " "
                      }` + "hover:font-black hover:text-black"
                    }
                    href="/informations/restaurant"
                  >
                    정보
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      `${
                        pathname.includes("/meetings")
                          ? "font-black text-black"
                          : " "
                      }` + "hover:font-black hover:text-black"
                    }
                    href="/meetings"
                  >
                    모임
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex flex-row space-x-2">
              <Link
                className="text-gray-500 hover:font-black hover:text-black"
                href="/login"
              >
                로그인
              </Link>
              <div className="text-gray-400">|</div>
              <Link className="font-black" href="/register">
                회원가입
              </Link>
            </div>
          </div>
          <Link
            className="pr-[38px] font-black max-[1024px]:pr-4"
            href="/mypage"
          >
            마이페이지
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HomeHeader;
