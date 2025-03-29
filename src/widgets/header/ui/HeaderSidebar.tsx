"use client";

import Image from "next/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import { useHeaderSidebar } from "../model/useHeaderSidebar";

interface HeaderSidebarProps {
  visible: boolean;
  onClose: () => void;
}

export const HeaderSidebar = ({ visible, onClose }: HeaderSidebarProps) => {
  const { id, hoverNum, setHoverNum, handleLogout } = useHeaderSidebar(onClose);

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="fixed top-0 left-0 z-50 flex h-[200%] w-full flex-row justify-end bg-black/25"
          initial={{ y: "-35.5rem", opacity: 0 }}
          animate={{ y: "0rem", opacity: 1 }}
          exit={{ y: "-35.5rem", opacity: 0 }}
          transition={{ bounce: false }}
          onClick={onClose}
        >
          <nav className="flex h-fit max-h-[calc(100vh-1rem)] w-81.5 flex-col gap-4 overflow-y-scroll rounded-b-lg bg-white p-4 pb-6">
            <div className="flex h-10 w-full items-center justify-end">
              <MdClose
                className="text-gray2 hover:text-main cursor-pointer"
                size="2.5rem"
                onClick={onClose}
              />
            </div>
            <div className="flex flex-col text-xl">
              <Link
                className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                href="/"
                onClick={onClose}
                onMouseEnter={() => setHoverNum(1)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(1)}
              >
                {hoverNum === 1 ? (
                  <Image
                    className="aspect-square"
                    src="/icons/home-green-icon.svg"
                    alt="home-green-icon"
                    width={22}
                    height={22}
                  />
                ) : (
                  <Image
                    className="aspect-square"
                    src="/icons/home-empty-icon.svg"
                    alt="home-empty-icon"
                    width={22}
                    height={22}
                  />
                )}
                <p className="pl-0.5">홈</p>
              </Link>
              <Link
                className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                href="/informations/list?page=1&parentCategoryId=1"
                onClick={onClose}
                onMouseEnter={() => setHoverNum(2)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(2)}
              >
                {hoverNum === 2 ? (
                  <Image
                    className="aspect-square"
                    src="/icons/information-green-icon.svg"
                    alt="information-green-icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    className="aspect-square"
                    src="/icons/information-empty-icon.svg"
                    alt="information-empty-icon"
                    width={24}
                    height={24}
                  />
                )}
                <p>여행 정보</p>
              </Link>
              <Link
                className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                href="/gathering"
                onClick={onClose}
                onMouseEnter={() => setHoverNum(3)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(3)}
              >
                {hoverNum === 3 ? (
                  <Image
                    className="aspect-square"
                    src="/icons/gathering-green-icon.svg"
                    alt="gathering-green-icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    className="aspect-square"
                    src="/icons/gathering-empty-icon.svg"
                    alt="gathering-empty-icon"
                    width={24}
                    height={24}
                  />
                )}
                <p>모임 정보</p>
              </Link>
              <Link
                className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                href="/diary/list?page=1"
                onClick={onClose}
                onMouseEnter={() => setHoverNum(4)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(4)}
              >
                {hoverNum === 4 ? (
                  <Image
                    className="aspect-square"
                    src="/icons/diary-green-icon.svg"
                    alt="diary-green-icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    className="aspect-square"
                    src="/icons/diary-empty-icon.svg"
                    alt="diary-empty-icon"
                    width={24}
                    height={24}
                  />
                )}
                <p>여행일기</p>
              </Link>
              <Link
                className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                href="/support?menu=about"
                onClick={onClose}
                onMouseEnter={() => setHoverNum(5)}
                onMouseLeave={() => setHoverNum(0)}
                onTouchStart={() => setHoverNum(5)}
              >
                {hoverNum === 5 ? (
                  <Image
                    className="aspect-square"
                    src="/icons/support-green-icon.svg"
                    alt="support-green-icon"
                    width={24}
                    height={24}
                  />
                ) : (
                  <Image
                    className="aspect-square"
                    src="/icons/support-empty-icon.svg"
                    alt="support-empty-icon"
                    width={24}
                    height={24}
                  />
                )}
                <p>고객지원</p>
              </Link>
              {Number(id) > 0 ? (
                <div className="flex flex-col">
                  <Link
                    className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                    href="/mypage?mainCategory=정보&category=owner"
                    onClick={onClose}
                    onMouseEnter={() => setHoverNum(6)}
                    onMouseLeave={() => setHoverNum(0)}
                    onTouchStart={() => setHoverNum(6)}
                  >
                    {hoverNum === 6 ? (
                      <Image
                        className="aspect-square"
                        src="/icons/mypage-green-icon.svg"
                        alt="mypage-green-icon"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image
                        className="aspect-square"
                        src="/icons/mypage-empty-icon.svg"
                        alt="mypage-empty-icon"
                        width={24}
                        height={24}
                      />
                    )}
                    <p>마이페이지</p>
                  </Link>
                  <button
                    className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                    onClick={handleLogout}
                    onMouseEnter={() => setHoverNum(7)}
                    onMouseLeave={() => setHoverNum(0)}
                    onTouchStart={() => setHoverNum(7)}
                  >
                    {hoverNum === 7 ? (
                      <Image
                        className="aspect-square"
                        src="/icons/logout-green-icon.svg"
                        alt="logout-green-icon"
                        width={24}
                        height={24}
                      />
                    ) : (
                      <Image
                        className="aspect-square"
                        src="/icons/logout-empty-icon.svg"
                        alt="logout-empty-icon"
                        width={24}
                        height={24}
                      />
                    )}
                    <p>로그아웃</p>
                  </button>
                </div>
              ) : (
                <Link
                  className="hover:text-main flex h-20 flex-row items-center gap-4 pl-15"
                  href="/auth/signin"
                  onClick={onClose}
                  onMouseEnter={() => setHoverNum(7)}
                  onMouseLeave={() => setHoverNum(0)}
                  onTouchStart={() => setHoverNum(7)}
                >
                  {hoverNum === 7 ? (
                    <Image
                      className="aspect-square"
                      src="/icons/signin-green-icon.svg"
                      alt="signin-green-icon"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <Image
                      className="aspect-square"
                      src="/icons/signin-empty-icon.svg"
                      alt="signin-empty-icon"
                      width={24}
                      height={24}
                    />
                  )}
                  <p>로그인</p>
                </Link>
              )}
            </div>
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
