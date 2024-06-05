import Link from "next/link";
import HeaderSidebar from "./HeaderSidebar";
import { MdOutlineMenu } from "react-icons/md";
import Image from "next/image";

type MyProps = {
  pathname: string;
  visible: boolean;
  onMenuClicked: () => void;
  onClose: () => void;
};

const Header = ({ pathname, visible, onMenuClicked, onClose }: MyProps) => {
  return (
    <header className="flex w-full flex-row justify-center">
      {visible && <HeaderSidebar onClose={onClose} />}
      <div className="fixed top-0 z-40 flex w-full justify-center bg-white shadow">
        <div className="flex h-20 w-[1440px] flex-row items-center justify-between">
          <div className="flex flex-row items-center">
            <div
              className="hidden cursor-pointer pl-4 max-[1024px]:flex"
              onClick={onMenuClicked}
            >
              <MdOutlineMenu size="2rem" onClick={onMenuClicked} />
            </div>
            <Link
              className="relative h-8 w-[92px] pl-[38px] font-black max-[1024px]:pl-4"
              href="/"
            >
              <Image
                className="ml-[38px] max-[1024px]:ml-4"
                src={"/Solitour-logo.svg"}
                alt={"/background"}
                fill={true}
                style={{
                  objectFit: "contain",
                }}
              />
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
          </div>
          <div className="flex flex-row space-x-2 pr-[38px] max-[1024px]:pr-4">
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
      </div>
      <div className="h-20" />
    </header>
  );
};

export default Header;
