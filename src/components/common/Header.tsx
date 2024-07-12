import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import HeaderSidebarContainer from "@/containers/common/HeaderSidebarContainer";

interface Props {
  pathname: string;
  visible: boolean;
  transparent: boolean;
  onMenuClicked: () => void;
  onClose: () => void;
  logoutHandler: () => void;
  nickName?: string;
}

const Header = ({
  pathname,
  visible,
  transparent,
  onMenuClicked,
  onClose,
  nickName,
  logoutHandler,
}: Props) => {
  return (
    <header className="flex w-full flex-row justify-center">
      {visible && <HeaderSidebarContainer onClose={onClose} />}
      <div
        className={
          "fixed top-0 z-40 flex w-full justify-center shadow" +
          ` ${transparent ? "bg-transparent" : "bg-white dark:bg-slate-800"}`
        }
      >
        <div className="flex h-20 w-[90rem] flex-row items-center justify-between max-[1024px]:px-6">
          <div className="flex flex-row items-center">
            <Link
              className="relative ml-[2.375rem] h-8 w-[5rem] font-black max-[1024px]:ml-4 max-[744px]:ml-0"
              href="/"
            >
              <Image
                className="dark:hidden"
                src={"/Solitour-logo.svg"}
                alt={"/background"}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              />
              <Image
                className="hidden dark:block"
                src={"/solitour-logo-dark-mode.png"}
                alt={"/background"}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
          <div className="flex flex-grow flex-row justify-between px-28 max-[744px]:hidden">
            <nav>
              <ul className="font flex flex-row space-x-10">
                <li>
                  <Link
                    className={
                      `${pathname === "/" ? "font-bold text-black dark:text-slate-200" : "font-medium text-gray1 dark:text-slate-400"} ` +
                      "text-sm hover:text-main"
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
                          ? "font-bold text-black dark:text-slate-200"
                          : "font-medium text-gray1 dark:text-slate-400"
                      } ` + "text-sm hover:text-main"
                    }
                    href="/informations/list/restaurant?subCategory=all"
                  >
                    정보
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      `${
                        pathname.includes("/meetings")
                          ? "font-bold text-black dark:text-slate-200"
                          : "font-medium text-gray1 dark:text-slate-400"
                      } ` + "text-sm hover:text-main"
                    }
                    href="/meetings"
                  >
                    모임
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      `${
                        pathname.includes("/diary")
                          ? "font-bold text-black dark:text-slate-200"
                          : "font-medium text-gray1 dark:text-slate-400"
                      } ` + "text-sm hover:text-main"
                    }
                    href="/diary/list"
                  >
                    여행일기
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <MdOutlineMenu
            className="hidden cursor-pointer hover:text-main max-[744px]:flex dark:text-slate-200"
            size="1.5rem"
            onClick={onMenuClicked}
          />
          <div className="flex flex-row items-center gap-2 pr-[2.375rem] text-sm max-[1024px]:pr-4 max-[744px]:hidden">
            {nickName == "" ? (
              <>
                <Link
                  className="font-medium text-gray1 hover:text-main dark:text-slate-400"
                  href="/auth/signin"
                >
                  로그인
                </Link>
                <div className="text-gray-400">|</div>
                <Link
                  className="font-semibold text-black hover:text-main dark:text-slate-200"
                  href="/auth/signup"
                >
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/mypage/profile"}
                  className={"relative rounded-[50%]"}
                >
                  <Image
                    className="rounded-full shadow dark:bg-slate-200"
                    src="/user_sex_man_default_image.svg"
                    alt="user_sex_man_default_image"
                    width={30}
                    height={30}
                  />
                </Link>
                <div className="text-gray-400">|</div>
                <button
                  onClick={logoutHandler}
                  className="font-semibold text-black hover:text-main dark:text-slate-200"
                >
                  로그아웃
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="h-20" />
    </header>
  );
};

export default Header;
