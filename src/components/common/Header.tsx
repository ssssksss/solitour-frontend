import HeaderSidebarContainer from "@/containers/common/HeaderSidebarContainer";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import UserImage from "../auth/UserImage";
import ReactToastifyComponent from "./ReactToastifyComponent";

interface Props {
  pathname: string;
  visible: boolean;
  transparent: boolean;
  onMenuClicked: () => void;
  onClose: () => void;
  logoutHandler: () => void;
  userId: number;
  userSex: string;
  userProfile: string;
}

const Header = ({
  pathname,
  visible,
  transparent,
  onMenuClicked,
  onClose,
  userId,
  logoutHandler,
  userSex,
  userProfile,
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
          <div className="flex flex-row items-center">
            <Link className="relative h-8 w-[6.9375rem] font-black" href="/">
              <Image
                src={"/Solitour-logo.svg"}
                alt={"/background"}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              />
            </Link>
          </div>
          <div className="flex flex-grow flex-row justify-between pl-28 max-[744px]:hidden">
            <nav>
              <ul className="flex flex-row gap-10">
                <li>
                  <Link
                    className={
                      `${pathname === "/" ? "font-bold text-black" : "font-medium text-black"} ` +
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
                          ? "font-bold text-black"
                          : "font-medium text-black"
                      } ` + "text-sm hover:text-main"
                    }
                    href="/informations/list?page=1&parentCategoryId=1"
                  >
                    정보
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      `${
                        pathname.includes("/gathering")
                          ? "font-bold text-black"
                          : "font-medium text-black"
                      } ` + "text-sm hover:text-main"
                    }
                    href="/gathering"
                  >
                    모임
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      `${
                        pathname.includes("/diary")
                          ? "font-bold text-black"
                          : "font-medium text-black"
                      } ` + "text-sm hover:text-main"
                    }
                    href="/diary/list?page=1"
                    prefetch={userId > 0}
                  >
                    여행일기
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      `${
                        pathname.includes("/support?menu=about")
                          ? "font-bold text-black"
                          : "font-medium text-black"
                      } ` + "text-sm hover:text-main"
                    }
                    href="/support?menu=about"
                    prefetch={userId > 0}
                  >
                    고객지원
                  </Link>
                </li>
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
                <Link
                  href={"/mypage?mainCategory=정보&category=owner"}
                  className={"relative rounded-[50%]"}
                >
                  <UserImage
                    userImageAddress={`${userProfile}`}
                    userSex={`${userSex}`}
                    size={30}
                  />
                </Link>

                <button
                  onClick={logoutHandler}
                  className="font-semibold text-black hover:text-main"
                >
                  로그아웃
                </button>
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
