import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { CiLogout } from "react-icons/ci";
import { MdClose } from "react-icons/md";

interface Props {
  signedIn: boolean;
  hoverNum: number;
  setHoverNum: Dispatch<SetStateAction<number>>;
  logoutHandler: () => void;
  onClose: () => void;
}

const HeaderSidebar = ({
  signedIn,
  hoverNum,
  setHoverNum,
  logoutHandler,
  onClose,
}: Props) => {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-[200%] w-full animate-sidebarFadeIn flex-row justify-end bg-black/25">
      <nav className="flex h-[35.5rem] w-[20.375rem] flex-col gap-4 rounded-b-lg bg-white p-4 pb-6 dark:bg-slate-800">
        <div className="flex h-10 w-full items-center justify-end">
          <div className="cursor-pointer rounded-md bg-gray-100 p-2 hover:text-main dark:bg-slate-600">
            <MdClose onClick={onClose} />
          </div>
        </div>
        <div className="flex flex-col gap-7 pl-[3.75rem] text-xl">
          <Link
            className="flex flex-row items-center gap-4 hover:text-main dark:text-slate-200"
            href="/"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(1)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(1)}
          >
            {hoverNum === 1 ? (
              <Image
                src="/home/home-icon-hover.svg"
                alt="home-icon"
                width={22}
                height={22}
              />
            ) : (
              <Image
                src="/home/home-icon.svg"
                alt="home-icon"
                width={22}
                height={22}
              />
            )}
            <p>홈</p>
          </Link>
          <Link
            className="flex flex-row items-center gap-4 hover:text-main dark:text-slate-200"
            href="/informations/list/parent-category/1?page=1"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(2)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(2)}
          >
            {hoverNum === 2 ? (
              <Image
                src="/home/information-icon-hover.svg"
                alt="information-icon"
                width={22}
                height={22}
              />
            ) : (
              <Image
                src="/home/information-icon.svg"
                alt="information-icon"
                width={22}
                height={22}
              />
            )}
            <p>여행 정보</p>
          </Link>
          <Link
            className="flex flex-row items-center gap-4 hover:text-main dark:text-slate-200"
            href="/gathering"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(3)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(3)}
          >
            {hoverNum === 3 ? (
              <Image
                src="/home/gathering-icon-hover.svg"
                alt="gathering-icon"
                width={22}
                height={22}
              />
            ) : (
              <Image
                src="/home/gathering-icon.svg"
                alt="gathering-icon"
                width={22}
                height={22}
              />
            )}
            <p>모임 정보</p>
          </Link>
          <Link
            className="flex flex-row items-center gap-[0.875rem] hover:text-main dark:text-slate-200"
            href="/diary/list"
            onClick={onClose}
            onMouseEnter={() => setHoverNum(4)}
            onMouseLeave={() => setHoverNum(0)}
            onTouchStart={() => setHoverNum(4)}
          >
            {hoverNum === 4 ? (
              <Image
                className="ml-[0.125rem]"
                src="/home/diary-icon-hover.svg"
                alt="diary-icon"
                width={22}
                height={22}
              />
            ) : (
              <Image
                className="ml-[0.125rem]"
                src="/home/diary-icon.svg"
                alt="diary-icon"
                width={22}
                height={22}
              />
            )}
            <p>여행일기</p>
          </Link>
          {signedIn ? (
            <div className="flex flex-col gap-4">
              <Link
                className="flex flex-row items-center gap-4 hover:text-main dark:text-slate-200"
                href="/mypage"
                onClick={onClose}
                onMouseEnter={() => setHoverNum(5)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(5)}
              >
                {hoverNum === 5 ? (
                  <Image
                    className="ml-[0.0625rem]"
                    src="/home/mypage-icon-hover.svg"
                    alt="signin-icon"
                    width={22}
                    height={22}
                  />
                ) : (
                  <Image
                    className="ml-[0.0625rem]"
                    src="/home/mypage-icon.svg"
                    alt="signin-icon"
                    width={22}
                    height={22}
                  />
                )}
                <p>마이페이지</p>
              </Link>
              <button
                className="flex flex-row items-center gap-[0.875rem] hover:text-main dark:text-slate-200"
                onClick={logoutHandler}
              >
                <CiLogout className="-ml-[0.125rem]" size="1.7rem" />
                <p>로그아웃</p>
              </button>
            </div>
          ) : (
            <Link
              className="flex flex-row items-center gap-4 hover:text-main dark:text-slate-200"
              href="/auth/signin"
              onClick={onClose}
              onMouseEnter={() => setHoverNum(5)}
              onMouseLeave={() => setHoverNum(0)}
              onTouchStart={() => setHoverNum(5)}
            >
              {hoverNum === 5 ? (
                <Image
                  className="-ml-[0.0625rem]"
                  src="/home/signin-icon-hover.svg"
                  alt="signin-icon"
                  width={22}
                  height={22}
                />
              ) : (
                <Image
                  className="-ml-[0.0625rem]"
                  src="/home/signin-icon.svg"
                  alt="signin-icon"
                  width={22}
                  height={22}
                />
              )}
              <p>로그인</p>
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default HeaderSidebar;
