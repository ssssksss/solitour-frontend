"use client";

import Image from "next/image";
import Link from "next/link";
import { MdOutlineMenu } from "react-icons/md";
import ReactToastifyComponent from "./ReactToastifyComponent";
import UserDropDown from "../auth/UserDropDown";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "@/stores/authStore";
import usePreventBodyScroll from "@/hooks/usePreventBodyScroll";
import { useThrottle } from "@/hooks/useThrottle";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import HeaderSidebar from "./HeaderSidebar";

const Header = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isTransparent, setIsTransparent] = useState(true);
  const { id, setUser } = useAuthStore();

  usePreventBodyScroll(visible);

  const onScroll = useThrottle(() => {
    if (window.scrollY >= 500) {
      setIsTransparent(false);
    } else {
      setIsTransparent(true);
    }
  }, 100);

  const onMenuClicked = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    // 모달창이 열린 상태로 새로고침을 하게되는 경우 히스토리 스택을 제거하기 위해서 뒤로가기 실행
    if (localStorage.getItem("isModal")) {
      history.back();
      localStorage.removeItem("isModal");
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    // 자동 로그인
    const login = async () => {
      try {
        const res = await fetchWithAuth("/api/auth/user");
        if (res.status == 200) {
          const data = await res.json();
          // 유저 상태가 '대기'인 경우는 쿠키를 제거하기 위해 로그아웃 처리
          if (data.userStatus == "대기") {
            await fetchWithAuth("/api/auth/logout", {
              method: "POST",
            });
            setUser({
              id: -1,
            });
          } else {
            setUser(data);
          }
          return;
        }
        setUser({ id: -1 });
      } catch {
        setUser({ id: -1 });
      }
    };
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="flex w-full flex-row justify-center">
      <HeaderSidebar visible={visible} onClose={onClose} />
      <ReactToastifyComponent />
      <div
        className={[
          "fixed right-0 top-0 z-40 flex w-full justify-center shadow",
          `${isTransparent ? "bg-[#ffffff30] backdrop-blur-md" : "bg-white"}`,
        ].join(" ")}
      >
        <div className="flex h-20 w-[90rem] flex-row items-center justify-between px-6">
          <div className="flex flex-row items-center p-0 max-[1024px]:pl-[1.875rem] max-[744px]:pl-0">
            <Link className="relative h-8 w-[6.9375rem] font-black" href="/">
              <Image
                src="/logos/solitour-logo.svg"
                alt="solitour-logo"
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
                    prefetch: id > 0,
                  },
                  {
                    name: "고객지원",
                    href: "/support?menu=about",
                    path: "/support",
                    prefetch: id > 0,
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
          <div className="absolute left-[calc(100vw-24px)] flex h-[2.25rem] w-[8rem] translate-x-[-100%] items-center gap-2 rounded-lg p-[.5rem] text-sm max-[744px]:hidden">
            {id == 0 ? (
              <>
                <div className="relative aspect-square w-[1.875rem] animate-pulseAuth rounded-[50%] shadow" />
                <div className="h-[1.875rem] w-[4rem] animate-pulseAuth font-semibold text-black hover:text-main" />
              </>
            ) : id > 0 ? (
              <UserDropDown />
            ) : (
              <Link
                className="ml-10 font-semibold text-black hover:text-main"
                href="/auth/signin"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="h-20" />
    </header>
  );
};

export default Header;
