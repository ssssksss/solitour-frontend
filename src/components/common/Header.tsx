import HeaderSidebarContainer from "@/containers/common/HeaderSidebarContainer";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import ReactToastifyComponent from "./ReactToastifyComponent";
import UserDropDown from "../auth/UserDropDown";

interface Props {
  pathname: string;
  visible: boolean;
  transparent: boolean;
  onMenuClicked: () => void;
  onClose: () => void;
  userId: number;
}

const Header = ({
  pathname,
  visible,
  transparent,
  onMenuClicked,
  onClose,
  userId,
}: Props) => {
  return (
    <header className="flex w-full flex-row justify-center">
      {visible && <HeaderSidebarContainer onClose={onClose} />}
      <ReactToastifyComponent />
      <div
        className={
          "fixed right-0 top-0 z-40 flex w-full justify-center shadow" +
          ` ${transparent ? "bg-[#ffffff30] backdrop-blur-md" : "bg-white"}`
        }
      >
        <div className="flex h-20 w-[90rem] flex-row items-center justify-between px-6">
          <div className="flex flex-row items-center p-0 max-[1024px]:pl-[1.875rem] max-[744px]:pl-0">
            <Link className="relative h-8 w-[6.9375rem] font-black" href="/">
              <Image
                src={"/common/solitour-logo.svg"}
                alt={"/background"}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
          <div className="flex h-full flex-grow flex-row justify-between pl-[5.625rem] max-[1024px]:pl-[3.375rem] max-[744px]:hidden">
            <nav className="h-full">
              <ul className="flex h-full items-center">
                <li className={"h-full"}>
                  <Link
                    className={`${pathname === "/" ? "font-bold" : "font-medium"} flex h-full w-full items-center justify-center px-5 text-sm text-black hover:text-main max-[1024px]:px-3`}
                    href="/"
                  >
                    홈
                  </Link>
                </li>
                {[
                  {
                    name: "정보",
                    href: "/informations/list?page=1&parentCategoryId=1",
                    path: "/informations",
                  },
                  { name: "모임", href: "/gathering", path: "/gathering" },
                  {
                    name: "여행일기",
                    href: "/diary/list?page=1",
                    path: "/diary",
                    prefetch: userId > 0,
                  },
                  {
                    name: "고객지원",
                    href: "/support?menu=about",
                    path: "/support",
                    prefetch: userId > 0,
                  },
                ].map(({ name, href, path, prefetch }, index) => (
                  <li key={index} className={"h-full"}>
                    <Link
                      className={`${pathname.includes(path) ? "font-bold" : "font-medium"} flex h-full w-full items-center justify-center px-5 text-sm text-black hover:text-main max-[1024px]:px-3`}
                      href={href}
                      prefetch={prefetch}
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <MdOutlineMenu
            className="absolute left-[calc(100vw-24px)] hidden translate-x-[-100%] cursor-pointer hover:text-main max-[744px]:flex"
            size="1.5rem"
            onClick={onMenuClicked}
          />
          <div
            className={
              "absolute left-[calc(100vw-24px)] flex h-[2.25rem] w-[8rem] translate-x-[-100%] items-center gap-2 rounded-lg p-[.5rem] text-sm max-[744px]:hidden"
            }
          >
            {userId == 0 ? (
              <>
                <div
                  className={
                    "relative aspect-square w-[1.875rem] animate-pulseAuth rounded-[50%] shadow"
                  }
                ></div>
                <div className="h-[1.875rem] w-[4rem] animate-pulseAuth font-semibold text-black hover:text-main"></div>
              </>
            ) : userId > 0 ? (
              <>
                <UserDropDown />
              </>
            ) : (
              <>
                <Link
                  className="font-semibold text-black hover:text-main"
                  href="/auth/signin"
                >
                  로그인
                </Link>
                <div className="text-gray-400">|</div>
                <Link
                  className="font-semibold text-black hover:text-main"
                  href="/auth/signup"
                >
                  회원가입
                </Link>
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
