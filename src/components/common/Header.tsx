import Link from "next/link";

type MyProps = {
  pathname: string;
};

const Header = ({ pathname }: MyProps) => {
  return (
    <header className="relative z-20 flex flex-row justify-center shadow">
      <div className="flex h-20 w-[1440px] flex-row items-center justify-between">
        <Link className="pl-[38px] font-black" href="/">
          Solitour
        </Link>
        <div className="flex flex-grow flex-row justify-between px-36">
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
        <Link className="pr-[38px] font-black" href="/mypage">
          마이페이지
        </Link>
      </div>
      <div className="h-20" />
    </header>
  );
};

export default Header;
